const AttendanceManagement = artifacts.require("AttendanceManagement");

module.exports = function (deployer) {
  deployer.deploy(AttendanceManagement);
};
