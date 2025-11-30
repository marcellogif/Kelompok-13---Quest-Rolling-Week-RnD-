const CUSTOMER = require('../models/CUSTOMER');
const mongoose = require('mongoose');

exports.homepage = async (req, res) => {
    const messages = await req.flash('info');
    const locals = {
        title: 'Node.js',
        description: 'Free NodeJs User Management System'
    }

    let perPage = 6;
    let page = req.query.page || 1;

    try {
        const customers = await CUSTOMER.aggregate([{ $sort: { createdAt: -1 } }])
        .skip(perPage * page - perPage)
        .limit(perPage)
        .exec();
    // Count is deprecated. Use countDocuments({}) or estimatedDocumentCount()
    // const count = await Customer.count();
        const count = await CUSTOMER.countDocuments({});

        res.render("index", {
            locals,
            customers,
            current: page,
            pages: Math.ceil(count / perPage),
            messages,
            });
    } catch (error) {
      console.log(error);
    }
}



// exports.homepage = async (req, res) => {
//     const messages = await req.flash('info');
//     const locals = {
//         title: 'Node.js',
//         description: 'Free NodeJs User Management System'
//     }
//     try {
//       const customers = await CUSTOMER.find({}).limit(22);
//       res.render('index', { locals, messages, customers } );
//     } catch (error) {
//       console.log(error);
//     }
// }


//New Customer form
exports.addCustomer = async (req, res) => {
    const locals = {
        title: 'Add feedback',
        description: 'Free NodeJs User Management System'
    }
    res.render('customer/add', locals); 
}

//POST Customer form
exports.postCustomer = async (req, res) => {
    console.log(req.body);

    const newCustomer = new CUSTOMER({
        fullName: req.body.fullName,
        email: req.body.email,
        divi: req.body.divi,
        eventName: req.body.eventName,
        rate: req.body.rate,
        comment: req.body.comment,
        suggestion: req.body.suggestion
    })

    // const locals = {
    //     title: 'New feedback added',
    //     description: 'Free NodeJs User Management System'
    // }

    try{
        await CUSTOMER.create(newCustomer);
        await req.flash('info', 'New customer has been added.');
        res.redirect('/'); 
    }
    catch(error){
        console.log(error);
    }
}


//View
exports.viewCustomer = async (req, res) => {
  try {
    const customer = await CUSTOMER.findOne({ _id: req.params.id });

    const locals = {
      title: "View Customer Data",
      description: "Free NodeJs User Management System",
    };

    res.render("customer/view", {
      locals,
      customer,
    });
  } catch (error) {
    console.log(error);
  }
};

//Edit 
exports.editCustomer = async (req, res) => {
  try {
    const customer = await CUSTOMER.findOne({ _id: req.params.id });

    const locals = {
      title: "Edit Customer Data",
      description: "Free NodeJs User Management System",
    };

    res.render("customer/edit", {
      locals,
      customer,
    });
  } catch (error) {
    console.log(error);
  }
};

//editPostCustomer
exports.editPostCustomer = async (req, res) => {
  try {
    await CUSTOMER.findByIdAndUpdate(req.params.id, {
      fullName: req.body.fullName,
      email: req.body.email,
      divi: req.body.divi,
      eventName: req.body.eventName,
      rate: req.body.rate,
      comment: req.body.comment,
      suggestion: req.body.suggestion,
      status: req.body.status,
      updatedAt: Date.now(),
    });
    await res.redirect(`/edit/${req.params.id}`);

    console.log("redirected");
  } catch (error) {
    console.log(error);
  }
};

//Delete feedback
exports.deleteCustomer = async (req, res) => {
  try {
    await CUSTOMER.deleteOne({ _id: req.params.id });
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};