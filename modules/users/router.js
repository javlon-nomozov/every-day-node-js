const router = require("express").Router();
const models = require("../../models");
const NotFoundError = require("../../shared/errors");

router.get("/", async (req, res) => {
  try {
    const { "order-asc": orderAsc, "order-desc": orderDesc } = req.query;
    console.log(orderAsc, orderDesc);
    console.log("Queries:", req.query, "\nParams:", req.params);
    const users = await models.User.findAll({
      include: {
        association: "profile",
        attributes: ["bio", "updatedAt"],
      },
      order: [
        orderAsc
          ? [orderAsc, "ASC"]
          : orderDesc
          ? [orderDesc, "DESC"]
          : ["createdAt", "DESC"],
      ],
    });
    res.json(users);
  } catch (error) {
    return console.log(error);
  }
});

router.get("/:userId", async (req, res) => {
  const user = await models.User.findByPk(req.params.userId, {
    include: {
      association: "profile",
      attributes: ["bio", "updatedAt"],
    },
  });
  console.log(req.params.userId);
  if (user) {
    return res.json(user);
  }
  return res.status(404).json(new NotFoundError("User not found").message);
});

router.post("/", async (req, res) => {
  let { username, profile } = req.body;
  profile = profile ?? {};
  let user;
  try {
    user = await models.User.create({ username });
  } catch (error) {
    return res.json({
      errorName: error.name,
      message: error?.errors[0]?.message,
    });
  }
  profile.userId = user.id;
  const newProfile = await models.Profile.create(profile);
  // console.log({newProfile});
  if (user) {
    const userWithProfile = await models.User.findOne({
      where: { id: user.id },
      include: {
        association: "profile",
        attributes: ["bio", "updatedAt"],
      },
    });
    // userWithProfile.toJSON()
    return res.json(userWithProfile.toJSON());
  }
  res.json(["Error occured with creating new user"]);
});

router.put("/:userId", async (req, res) => {
  const { username, profile } = req.body;
  const { userId } = req.params;
  let user;
  try {
    user = await models.User.findByPk(userId);
    if (!user) {
      return res.status(404).json(new NotFoundError("User not found").message);
    }
    user.username = username;
    let foundProfile;
    try {
      await user.save();
    } catch (error) {
      return res.json({
        errorName: error.name,
        message: error.errors[0].message,
      });
    }
    if (profile) {
      foundProfile = await models.Profile.findByPk(user.id);
      if (profile.bio && foundProfile.userId === user.id) {
        foundProfile.bio = profile.bio;
        foundProfile.save();
      } else {
        return res
          .status(404)
          .json("error occured: user.id is not equal to profile.userId");
      }
    }
    if (user) {
      const userWithProfile = await models.User.findOne({
        where: { id: user.id },
        include: {
          association: "profile",
          attributes: ["bio", "updatedAt"],
        },
      });
      return res.json(userWithProfile.toJSON());
    }
    res.json(["Error occured with creating new user"]);
  } catch (error) {
    return res.json({
      errorName: error?.name,
      message: error,
    });
  }
});

router.delete("/:userId", async (req, res) => {
  const { userId } = req.params;
  let user;
  try {
    user = await models.User.findByPk(userId);
    if (!user) {
      return res.status(404).json(new NotFoundError("User not found").message);
    }
    const userWithProfile = await models.User.findOne({
      where: { id: user.id },
      include: {
        association: "profile",
        attributes: ["bio", "updatedAt"],
      },
    });
    user.destroy();
    return res.json(userWithProfile.toJSON());
  } catch (error) {
    console.log(error);
    return res.json({
      errorName: error?.name,
      message: error,
    });
  }
});

module.exports = router;
