var express = require('express');
var router = express.Router();
var Vmos = require('../models/vmos');
var expressSanitizer = require('express-sanitizer');
var User = require('../models/user');
var Pending = require('../models/pending');
var Subject = require('../models/subject');
var News = require('../models/newsAndAnnouncement');
var Data = require('../models/data');
var Messages = require('../models/messages');

var Literary = require('../models/literary');

router.use(expressSanitizer());

router.get('/search', function (req, res, next) {
  if (req.query.search == 'news') {
    const regex = new RegExp(escapeRegex(req.query.search), 'gi');
    News.find({
      category: regex,
      archive: false
    }, function (err, allNews) {
      if (err) return next(err);
      return res.render('main/search', {
        allNews: allNews
      });
    });
  } else if (
    req.query.search == 'announcement' ||
    req.query.search == 'announcements'
  ) {
    const regex = new RegExp(escapeRegex(req.query.search), 'gi');
    News.find({
      category: regex,
      archive: false
    }, function (err, allNews) {
      if (err) return next(err);
      return res.render('main/search', {
        allNews: allNews
      });
    });
  } else if (req.query.search) {
    console.log(req.query.search);
    const regex = new RegExp(escapeRegex(req.query.search), 'gi');
    News.find({
        $or: [{
            title: regex,
            archive: false
          },
          {
            content: regex,
            archive: false
          },
        ],
      },
      function (err, allNews) {
        if (err) return next(err);
        return res.render('main/search', {
          allNews: allNews,
        });
      },
    );
  } else {
    News.find({
      archive: false
    }, function (err, allNews) {
      if (err) return next(err);
      return res.render('main/search', {
        allNews: allNews
      });
    });
  }
});

router.get('/', function (req, res, next) {
  console.log(req.user)
  if (req.user) {
    if (req.user.deactivate) {
      req.logout();
      req.flash('message', 'Your account has been deactivated');
      return res.redirect('/');
    }
  }
  News.findOne({
      archive: false
    })
    .sort({
      postNumber: -1
    })
    .exec(function (err1, news) {
          if (err1) return next(err1);
          res.render('main/homeplayground', {
            news: news,
          });
    });
});

router.get('/activities', function (req, res, next) {
  res.render('main/activities');
});

router.get('/search', function (req, res, next) {
  res.render('main/search');
});

router.get('/admindashboard', function (req, res, next) {
  res.render('admin/dashboard');
});

router.get('/registrationlist', function (req, res, next) {
  res.render('admin/registrationlist');
});

router.get('/abc', function (req, res, next) {
  Subject.find({
    faculty: '5ae5def3e4708d7dde8a190e'
  }, function (
    err,
    subjects,
  ) {
    if (err) return next(err);
    console.log(subjects);
    res.render('main/abc', {
      subjects: subjects
    });
  });
});

router.post('/abc', function (req, res, next) {
  console.log(req.body.abc);
});
router.post('/abc1', function (req, res, next) {
  console.log(req.body.abc);
});

router.get('/adminviewgrade', function (req, res, next) {
  res.render('admin/viewgrade');
});

router.get('/facultydashboard', function (req, res, next) {
  res.render('faculty/dashboard');
});
router.get('/facultsetting', function (req, res, next) {
  res.render('faculty/accountsetting');
});

router.get('/studentdashboard', function (req, res, next) {
  res.render('student/dashboard');
});

router.get('/viewgrade', function (req, res, next) {
  res.render('student/grade');
});

router.get('/admissionreq', function (req, res, next) {
  res.render('main/admissionreq');
});

router.get('/awards', function (req, res, next) {
  res.render('main/awards');
});

router.get('/clubs', function (req, res, next) {
  res.render('main/clubs');
});

router.get('/curriculum', function (req, res, next) {
  res.render('main/curriculum');
});

router.get('/facilities', function (req, res, next) {
  res.render('main/facilities');
});
router.get('/viewpubs', function (req, res, next) {
  res.render('admin/viewpublication');
});
router.get('/faculty', function (req, res, next) {
  res.render('main/faculty');
});
router.get('/publication', function (req, res, next) {
  Literary.find({
      status: true
    })
    .sort({
      publishDate: -1
    })
    .exec(function (err1, literaries) {
          if (err1) return next(err1);
          res.render('main/Publication', {
            literaries: literaries,
          });
    });
});
router.get('/facultyviewpubs', function (req, res, next) {
  res.render('faculty/viewpublication');
});
router.get('/adminsetting', function (req, res, next) {
  res.render('admin/accountsetting');
});
router.get('/studentsetting', function (req, res, next) {
  res.render('student/accountsetting');
});

router.get('/facultymanagepubs', function (req, res, next) {
  Literary.find({}, function (err, allPending) {
    if (err) return next(err);
    res.render('faculty/managepublication', {
      allPending: allPending
    });
  });
});

router.get('/register', function (req, res, next) {
  res.render('main/register', {
    errors: req.flash('errors'),
    success: req.flash('success'),
  });
});

router.post('/register', function (req, res, next) {
  var pending = new Pending();

  console.log(req.body.firstName + " " + req.body.middleName + " " + req.body.lastName);
 
  console.log("old");
  var studentNo = Number(req.body.stuno);
  var firstName = String(req.body.firstName);
  var lastName = String(req.body.lastName);
  Data
    .findOne({ 
      studentNo: studentNo, 
      firstName: firstName, 
      lastName: lastName,
    }, function(err, data){
      if(err) return next(err);
      console.log('data', data);
      console.log('req.body', req.body);
      if(!data){
          console.log('wala');
          req.flash('message', 'Account with that details does not exist');
          return res.redirect('/register');
      }
      else{
        if(data.studentNo === studentNo && data.firstName === firstName && data.lastName === lastName){
          
          if (
            // req.body.stuno &&
            req.body.firstName &&
            req.body.middleName &&
            req.body.year &&
            req.body.month &&
            req.body.day &&
            req.body.lastName &&
            req.body.age &&
            req.body.gender &&
            req.body.address &&
            req.body.email &&
            req.body.contact
          ) {

            Pending.findOne({
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName
            }, function (err, existingUser) {
              if (existingUser) {
                console.log("new");
                req.flash('message', 'Pending account with that email address already exist');
                return res.redirect('back');
              } else{
                Pending.findOne({
                  studentNo: req.body.stuno
                }, function (err, existingUser2) {
                if (existingUser2) {
                  console.log("new");
                  req.flash('message', 'Pending account with that student number already exist');
                  return res.redirect('back');
                } else {
                User.findOne({
                email: req.body.email
                }, function (err, existingUser3) {
                if (existingUser3) {
                console.log("new");
                req.flash('message', 'Account with that email address already exist');
                return res.redirect('back');
                } else {
                User.findOne({
                studentNo: req.body.stuno
                }, function (err, existingUser4) {
                if (existingUser4) {
                console.log("new");
                req.flash('message', 'Account with that student number already exist');
                return res.redirect('back');
                } else {
                  pending.studentNo = Number(req.body.stuno);
                pending.firstName = req.body.firstName;
                pending.middleName = req.body.middleName;
                pending.lastName = req.body.lastName;
                pending.age = req.body.age;
                pending.address = req.body.address;
                pending.gender = req.body.gender;
                pending.email = req.body.email;
          
                pending.birthdate = new Date(
                  req.body.year + '-' + req.body.month + '-' + req.body.day,
                );
                pending.contact = req.body.contact;
          
                pending.save(function (err, pendingUser) {
                  console.log(req.body.gender);
                  if (err) return next(err);
                  req.flash(
                    'success',
                    'Your account is in proccess now by the administrator',
                  );
                  return res.redirect('/register');
                });
                }
                });
                }
                });

                }
              });
              }
            });
      
            
          } else {
            req.flash('errors', 'Please enter all the required information.');
            return res.redirect('/register');
          }
        } else {
          req.flash('message', 'Account with that details does not exist');
          return res.redirect('/register');
        }
      } 
      });
});

router.get('/gallery', function (req, res, next) {
  res.render('main/gallery');
});

router.get('/history', function (req, res, next) {
  res.render('main/history');
});

router.get('/home', function (req, res, next) {
  res.render('main/home');
});

router.get('/news', function (req, res, next) {
  News.find({
      archive: false
    })
    .sort({
      postNumber: -1
    })
    .exec(function (err1, news) {
          if (err1) return next(err1);
          res.render('main/news', {
            news: news,
          });
    });
});

router.get('/orgchart', function (req, res, next) {
  res.render('main/orgchart');
});

router.get('/policies', function (req, res, next) {
  res.render('main/policies');
});

router.get('/register', function (req, res, next) {
  res.render('main/register');
});

router.get('/scholarships', function (req, res, next) {
  res.render('main/scholarships');
});

router.get('/service', function (req, res, next) {
  res.render('main/services');
});

router.get('/vmop', function (req, res, next) {
  Vmos.find({}, function (err, visionmission) {
    if (err) return next(err);
    res.render('main/vmop', {
      visionmission: visionmission
    });
  });
  // res.render('main/vmop');
});

router.get('/messageus',function (req, res, next){
  res.render('main/messageus');
});

router.post('/sendmessage',function(req, res, next){
  var messages = new Messages();
  messages.email = req.body.email;
  messages.subject = req.body.subject;
  messages.content = req.sanitize(req.body.content);
  messages.save(function(err, messages){
      if (err) return next(err);
      req.flash(
        'message',
        'You have successfully sent a message.',
      );
      console.log(messages);
      res.redirect('/messageus');
  });
  console.log(req.body);
});

function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

module.exports = router;