function isDateFormat(cadena) {
    // Expresión regular para el formato YYYY/MM/DD HH:MI:SS
    const formatOne = /^\d{4}\/\d{2}\/\d{2} \d{1,2}:\d{2}:\d{2}$/;
    const formatTwo = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;

    // Comprueba si la cadena coincide con el formato
    return formatOne.test(cadena) || formatTwo.test(cadena);
}

function removeNullUndefinedKeys(inputObject) {
    // Filtrar las propiedades con valores no nulos o no indefinidos
    const filteredObject = Object.fromEntries(
      Object.entries(inputObject).filter(([key, value]) => value !== null && value !== undefined)
    );
  
    return filteredObject;
  }

function formatObjToInsertSql(objectPivot, table) {
    const object = removeNullUndefinedKeys(objectPivot)
    const columns = Object.keys(object);
    const fields = Object.values(object);
    const columnsSQL = columns.join(', ');
    const fieldsSQL = fields.map(value => {
        if (typeof value === 'string') {
            return isDateFormat(value) ? `TO_DATE('${new Date(value).toISOString().replace('T', ' ').replace('.000Z', '')}', 'YYYY-MM-DD HH24:MI:SS')` : `'${value}'`;
        }
        return value;
    }).join(', ');
  
    // Forma la sentencia SQL completa
    const sentenciaSQL = `INSERT INTO BAAN.${table} (${columnsSQL}) VALUES (${fieldsSQL})`;
  
    return sentenciaSQL;
  }

module.exports = {
    formatObjToInsertSql
}