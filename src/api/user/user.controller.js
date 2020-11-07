const UserModel = require("./user.model");
const {
  successResponse,
  failureResponse,
} = require("../../utils/response.format");

/**
 * @function getUsers
 * @description Function to return user list
 */
const getUsers = (req, res) => {
  UserModel.find()
    .then((response) => {
      successResponse(res, "User List", response);
    })
    .catch((e) => {
      failureResponse(res, e.message, e);
    });
};

/**
 * @function createUser
 * @description Function to create a user account
 */
const createUser = async (req, res) => {
  const userObj = UserModel(req.body);
  userObj
    .save()
    .then((response) => {
      //   console.log("response", response);
      res
        .status(201)
        .send(
          successResponse(true, 201, "User account created", response, req.body)
        );
    })
    .catch((e) => {
      // console.log("catch error", e);
      if (e.name === "MongoError" && e.keyPattern.email) {
        res
          .status(400)
          .send(
            failureResponse(
              false,
              400,
              "Email Id already exists",
              "Bad Request",
              req.body
            )
          );
      } else if (e.name === "MongoError" && e.keyPattern.phone) {
        res
          .status(400)
          .send(
            failureResponse(
              false,
              400,
              "Phone already exists",
              "Bad Request",
              req.body
            )
          );
      } else {
        res
          .status(400)
          .send(
            failureResponse(false, 400, "MongoError", "Bad Request", req.body)
          );
        return;
      }
      res
        .status(e.status)
        .send(failureResponse(false, e.status, e.message, e, req.body));
    });
};

module.exports = { getUsers, createUser };
