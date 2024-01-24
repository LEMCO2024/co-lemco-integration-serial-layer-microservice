const repository = require("../../utils/db_manager");
const pricesMapper = require("./prices.mapper");
const { productsBySerial, asociatedProducts } = require("./prices.queries");

const findProductBySerial = async (serialCode) => {
  const pricesResponseOutput = await repository.execute(productsBySerial, [
    serialCode,
  ]);
  return pricesResponseOutput;
};

const findAsociatedProduct = async (serialCode, skuCode) => {
  const asociatedProductsOutput = await repository.execute(asociatedProducts, [
    serialCode,
    skuCode,
  ]);
  return asociatedProductsOutput.length > 0;
};

const bulkAddManyProducts = async (products) => {
  const productsInStock = [];
  const productsToCreate = [];
  const feedbackProductsCreate = [];

  await Promise.all(
    products.map(async (productToFind) => {
      const serialCode = productToFind.LOTE;
      const responseOutput = await repository.execute(productsBySerial, [
        serialCode,
      ]);
      const productExist = responseOutput.length > 0;
      if (productExist) {
        productsInStock.push(productToFind);
      } else {
        productsToCreate.push(productToFind);
      }
      return null;
    })
  );

  await Promise.all(
    productsToCreate.map(async (productToCreate) => {
      const productBase = {
        LOTE: productToCreate["LOTE"],
        ARTICULO: productToCreate["ARTICULO"],
        ALMACEN: productToCreate["ALMACEN"],
        COMPRESOR: productToCreate["COMPRESOR"],
        DOCUMENTO: productToCreate["DOCUMENTO"],
        CONSECUTIVO: productToCreate["CONSECUTIVO"],
        TIPO: productToCreate["TIPO"],
        ORDEN: productToCreate["ORDEN"],
        ORIGEN: productToCreate["ORIGEN"],
        CRFECHA: productToCreate["CRFECHA"],
        CREO: productToCreate["CREO"],
        FECHACREO: productToCreate["FECHACREO"],
        MODIFICO: productToCreate["MODIFICO"],
        FECHAMODIFICO: productToCreate["FECHAMODIFICO"],
        SINIESTRO: productToCreate["SINIESTRO"],
      };
      const productDesciptions = {
        T$ITEM: productToCreate["T$ITEM"],
        T$KITM: productToCreate["T$KITM"],
        T$CITG: productToCreate["T$CITG"],
        T$ITMT: productToCreate["T$ITMT"],
        T$DSCA: productToCreate["T$DSCA"],
        T$DSCB: productToCreate["T$DSCB"],
        T$DSCC: productToCreate["T$DSCC"],
        T$DSCD: productToCreate["T$DSCD"],
        T$SEAK: productToCreate["T$SEAK"],
        T$SEAB: productToCreate["T$SEAB"],
        T$USET: productToCreate["T$USET"],
        T$CUNI: productToCreate["T$CUNI"],
        T$CWUN: productToCreate["T$CWUN"],
        T$WGHT: productToCreate["T$WGHT"],
        T$CTYP: productToCreate["T$CTYP"],
        T$KLTC: productToCreate["T$KLTC"],
        T$CSEL: productToCreate["T$CSEL"],
        T$CSIG: productToCreate["T$CSIG"],
        T$CWAR: productToCreate["T$CWAR"],
        T$CTYO: productToCreate["T$CTYO"],
        T$CPCL: productToCreate["T$CPCL"],
        T$EITM: productToCreate["T$EITM"],
        T$UMER: productToCreate["T$UMER"],
        T$CPLN: productToCreate["T$CPLN"],
        T$CCDE: productToCreate["T$CCDE"],
        T$CMNF: productToCreate["T$CMNF"],
        T$CEAN: productToCreate["T$CEAN"],
        T$CONT: productToCreate["T$CONT"],
        T$CNTR: productToCreate["T$CNTR"],
        T$CPRJ: productToCreate["T$CPRJ"],
        T$REPL: productToCreate["T$REPL"],
        T$CPVA: productToCreate["T$CPVA"],
        T$DFIT: productToCreate["T$DFIT"],
        T$STOI: productToCreate["T$STOI"],
        T$CPCP: productToCreate["T$CPCP"],
        T$OBID: productToCreate["T$OBID"],
        T$OPTS: productToCreate["T$OPTS"],
        T$TXTA: productToCreate["T$TXTA"],
        T$REFCNTD: productToCreate["T$REFCNTD"],
        T$REFCNTU: productToCreate["T$REFCNTU"],
      };
      const productDistributor = {
        T$SHPM: productToCreate["T$SHPM"],
        T$LOAD: productToCreate["T$LOAD"],
        T$SFTY: productToCreate["T$SFTY"],
        T$SFCO: productToCreate["T$SFCO"],
        T$SFAD: productToCreate["T$SFAD"],
        T$STTY: productToCreate["T$STTY"],
        T$STCO: productToCreate["T$STCO"],
        T$STAD: productToCreate["T$STAD"],
        T$CRTE: productToCreate["T$CRTE"],
        T$PDDT: productToCreate["T$PDDT"],
        T$WGHT: productToCreate["T$WGHT"],
        T$CDEC: productToCreate["T$CDEC"],
        T$CONF: productToCreate["T$CONF"],
        T$CDAT: productToCreate["T$CDAT"],
        T$KOCH: productToCreate["T$KOCH"],
        T$CURR: productToCreate["T$CURR"],
        T$CHAM: productToCreate["T$CHAM"],
        T$STAT: productToCreate["T$STAT"],
        T$HAZM: productToCreate["T$HAZM"],
        T$RISK: productToCreate["T$RISK"],
        T$BOLP: productToCreate["T$BOLP"],
        T$PCSP: productToCreate["T$PCSP"],
        T$ITBP: productToCreate["T$ITBP"],
        T$INVN: productToCreate["T$INVN"],
        T$INVD: productToCreate["T$INVD"],
        T$FVAL: productToCreate["T$FVAL"],
        T$TEXT: productToCreate["T$TEXT"],
        T$IEDI: productToCreate["T$IEDI"],
        T$REFCNTD: productToCreate["T$REFCNTD"],
        T$REFCNTU: productToCreate["T$REFCNTU"],
      };
      const productSendData = {
        T$BPID: productToCreate["T$BPID"],
        T$CTIT: productToCreate["T$CTIT"],
        T$NAMA: productToCreate["T$NAMA"],
        T$SEAK: productToCreate["T$SEAK"],
        T$PRBP: productToCreate["T$PRBP"],
        T$PRST: productToCreate["T$PRST"],
        T$STDT: productToCreate["T$STDT"],
        T$ENDT: productToCreate["T$ENDT"],
        T$CLAN: productToCreate["T$CLAN"],
        T$CCUR: productToCreate["T$CCUR"],
        T$SNDR: productToCreate["T$SNDR"],
        T$EDYN: productToCreate["T$EDYN"],
        T$FOVN: productToCreate["T$FOVN"],
        T$LVDT: productToCreate["T$LVDT"],
        T$INRL: productToCreate["T$INRL"],
        T$ISCN: productToCreate["T$ISCN"],
        T$LGID: productToCreate["T$LGID"],
        T$CMID: productToCreate["T$CMID"],
        T$BPTX: productToCreate["T$BPTX"],
        T$CADR: productToCreate["T$CADR"],
        T$CCNT: productToCreate["T$CCNT"],
        T$XKEY: productToCreate["T$XKEY"],
        T$CINT: productToCreate["T$CINT"],
        T$TXTA: productToCreate["T$TXTA"],
        T$REFCNTD: productToCreate["T$REFCNTD"],
        T$REFCNTU: productToCreate["T$REFCNTU"],
      };
      const productBaseSqlToInsert = pricesMapper.formatObjToInsertSql(
        productBase,
        "TCHAPR018120"
      );
      // const productDesciptionsSqlToInsert = pricesMapper.formatObjToInsertSql(productDesciptions, "TTCIBD001120");
      // const productDistributorSqlToInsert = pricesMapper.formatObjToInsertSql(productDistributor, "TWHINH430120");
      // const productSendDataSqlToInsert = pricesMapper.formatObjToInsertSql(productSendData, "TTCCOM100120");

      const responseOutputProductBase = await repository.executeInsert(
        productBaseSqlToInsert,
        []
      );
      // const responseOutputProductDesciptions = await repository.executeInsert(productDesciptionsSqlToInsert, []);
      // const responseOutputProductDistributor = await repository.executeInsert(productDistributorSqlToInsert, []);
      // const responseOutputProductSendData = await repository.executeInsert(productSendDataSqlToInsert, []);
      feedbackProductsCreate.push({
        productBase,
        responseOutputProductBase /*responseOutputProductDesciptions, responseOutputProductDistributor, responseOutputProductSendData */,
      });
      return null;
    })
  );

  return {
    error:
      productsInStock.length > 0
        ? {
            message:
              "These products already exist therefore they cannot be created.",
            listProductsInError: productsInStock,
          }
        : undefined,
    success:
      successProductsCreated.length > 0
        ? {
            message: "successfully created products.",
            listProductsCreated: successProductsCreated,
          }
        : undefined,
  };
};

module.exports = {
  bulkAddManyProducts,
  findProductBySerial,
  findAsociatedProduct,
};
