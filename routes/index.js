
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index');
};

exports.prizes = function(req, res){
    res.render('prizes');
}

exports.about = function(req, res){
    res.render('about');
}