const oracledb = require("oracledb");
const secret_manager = require("./secret_manager")

const openConnection = async () => {
  try {
    const dbConecctionData = await secret_manager.getDBConecctionData();
    const dbConnectionUrl = `${dbConecctionData.host}:${dbConecctionData.port}/${dbConecctionData.name}`;
    console.info("dbConnectionUrl" , dbConnectionUrl);
    return await oracledb.createPool({
      user: dbConecctionData.user,
      password: dbConecctionData.password,
      connectString: dbConnectionUrl,
      poolMax: 2,
      poolMin: 0,
      poolTimeout: 0
    })
  } catch (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
};

const execute = async (sql, bind, noGet) => {
  let connection;
  try {
    console.log("execute data", JSON.stringify({ sql, bind }));
    connection = await oracledb.getConnection();
    const result = await connection.execute(sql, bind, { autoCommit: true });
    const parsedResult = noGet ? result : getArrayOfObjects(result);
    console.log("execute result: ", JSON.stringify(parsedResult));
    return parsedResult;
  } catch (error) {
    console.log("execute service error: ", error);
    throw new Error("Oracle service unavailable");
  } finally {
    if (connection) await connection.close();
  }
};

const executeInsert = async (sql, bind) => {
  let connection;
  try {
    console.log("executeInsert data", JSON.stringify({ sql, bind }));
    connection = await oracledb.getConnection();
    const result = await connection.execute(sql, bind, { autoCommit: true });
    return result;
  } catch (error) {
    console.log("executeInsert service error: ", error);
    throw new Error("Oracle service unavailable");
  } finally {
    if (connection) await connection.close();
  }
};

const executeMany = async (sql, bind) => {
  let connection;
  try {
    console.log("execute data", JSON.stringify({ sql, bind }));
    connection = await oracledb.getConnection();
    const result = await connection.executeMany(sql, bind, { autoCommit: true });
    console.log("execute result: ", JSON.stringify(result));
    return result;
  } catch (error) {
    console.log("execute service error: ", error);
    throw new Error("Oracle service unavailable");
  } finally {
    if (connection) await connection.close();
  }
};

const createObjectFromRow = (row, metaData) => {
  const result = {};
  row.forEach((value, index) => {
    const key = metaData[index].name;
    result[key] = typeof value === "string" ? value : value;
  });
  return result;
};

const getArrayOfObjects = (data) => {
  const { rows, metaData } = data;
  const result = [];
  rows.forEach((row) => {
    const obj = createObjectFromRow(row, metaData);
    result.push(obj);
  });
  return result;
};

// TODO check query parameters like db name
const generateQuery = (action, table, data, change = null) => {
  let queryData = `${action} ${action.includes("SELECT") ? "FROM " : ""}BAAN.${table} `;
  if (change) queryData += `SET ${change} `;
  queryData += "WHERE ";
  let index = 1;
  for (const clave in data) {
    let valor = data[clave];
    if (typeof valor === "string") {
      queryData += `TRIM(${clave}) = '${valor.trim()}' `;
    } else {
      queryData += `${clave} = ${valor}`;
    }
    if (index != Object.values(data).length) queryData += " AND ";
    index += 1;
  }
  return queryData;
};

// TODO check query parameters
const generateInsertQuery = (table, data) => {
  let queryData = `INSERT INTO BAAN.${table} (`;
  let valuesData = ` VALUES (`;
  let index = 1;
  for (const clave in data) {
    queryData += `${clave}`;
    valuesData += `:${clave}`;
    if (index != Object.values(data).length) {
      queryData += ", ";
      valuesData += ", ";
    } else {
      queryData += ")";
      valuesData += ")";
    }
    index += 1;
  }
  return queryData + valuesData;
};

module.exports = {
  generateInsertQuery,
  openConnection,
  generateQuery,
  executeMany,
  executeInsert,
  execute,
};