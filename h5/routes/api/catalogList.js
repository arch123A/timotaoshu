var express = require('express');
var router = express.Router();
const { oauth, tool, db, log } = require("../../tool/require");

/*
*   page 页数
*   limit 一页几条
*
* */
router.use('', async function(req, res, next) {
    tool.allowVisit(res); //为了跨域
    let bookId = parseInt(req.query.bookId || req.body.bookId);
    let page = req.query.page || req.body.page || 1;
    let limit = req.query.limit || req.body.limit || 10;

    if(!bookId) {
        res.send(tool.toJson(null, 'bookId不可为空', 1002));
        return;
    }


    let catalog = await db.query(`select * from catalog where bookId=${bookId} ORDER BY num ASC limit ${(page-1) * limit},${limit}` );
    let count = (await db.query(`select count(*) from catalog where bookId=${bookId}`))[0]["count(*)"];
    let catalogList = {
        count: count,
        catalog: catalog
    }

    res.send(tool.toJson(catalogList, '', 1000));
});

module.exports = router;
