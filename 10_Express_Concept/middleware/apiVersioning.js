
const urlVersioning = (version) => (req, res, next) => {
  if (req.path.startsWith(`/api/${version}`)) {
    next();
  } else {
    res.status(404).json({
      success: false,
      error: "API version is not supported",
    });
  }
};

/*
we can also write in this format simple urlversion take the argument and return the fucntion and function so return is express middleware
const urlVersioning = (version) => {

--------------------- 
the return function is express middleware 
because we need weather to continue the request by
 calling next() or  dimiss it by giving response
----------------------

  return (req, res, next) => {
    if (req.path.startsWith(`/api/${version}`)) {
      next(); // ✅ Valid → continue
    } else {
      res.status(404).json({
        success: false,
        error: "API version is not supported"
      }); // ❌ Invalid → stop here
    }
  };
};


*/

const headerVersioning = (version) => (req, res, next) => {
  if (req.get("Accept-Version") === version) {
    next();
  } else {
    res.status(404).json({
      success: false,
      error: "API version is not supported",
    });
  }
};

const contentTypeVersioning = (version) => () => {
  const contentType = req.get("Content-Type");
  if (
    contentType &&
    contentType.includes(`application/vnd.api.${version} + json`)
  ) {
    next();
  } else {
    res.status(404).json({
      success: false,
      error: "API version is not supported",
    });
  }
};


module.exports ={urlVersioning ,headerVersioning ,contentTypeVersioning}