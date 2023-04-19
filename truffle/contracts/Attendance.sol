// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract AttendanceManagement {
    /*
     * USER
     * TODO: add docstring here
     */
    struct User {
        string name;
        string email;
        string phone;
        uint256[] attendanceIds;
        uint256[] charityIds;
        uint256[] donationIds;
    }

    mapping(address => User) public users;

    function addUser(
        string memory _name,
        string memory _email,
        string memory _phone
    ) public {
        users[msg.sender] = User(
            _name,
            _email,
            _phone,
            new uint256[](0),
            new uint256[](0),
            new uint256[](0)
        );
    }

    function getUser(address _address) public view returns (string memory) {
        return users[_address].name;
    }

    struct Attendance {
        string branch;
        string division;
        string subject;
        string timestamp;
        string lectureStartTime;
        string lectureEndTime;
        uint256 totalStudents;
        uint256[] rollNums;
    }

    mapping(uint256 => Attendance) public attendances;
    uint256 public attendanceCount = 0;

    function addAttendance(
        string memory _branch,
        string memory _division,
        string memory _subject,
        string memory _timestamp,
        string memory _lectureStartTime,
        string memory _lectureEndTime,
        uint256 _totalStudents,
        uint256[] memory _rollNums
    ) public {
        attendanceCount++;
        attendances[attendanceCount] = Attendance(
            _branch,
            _division,
            _subject,
            _timestamp,
            _lectureStartTime,
            _lectureEndTime,
            _totalStudents,
            _rollNums
        );
    }

    function getAttendance(
        uint256 _att
    )
        public
        view
        returns (
            string memory branch,
            string memory division,
            string memory subject,
            string memory timestamp,
            string memory lectureStartTime,
            string memory lectureEndTime,
            uint256[] memory rollNums
        )
    {
        return (
            attendances[_att].branch,
            attendances[_att].division,
            attendances[_att].subject,
            attendances[_att].timestamp,
            attendances[_att].lectureStartTime,
            attendances[_att].lectureEndTime,
            attendances[_att].rollNums
        );
    }

    function getTotalStudents(
        uint256 _attendanceId
    ) public view returns (uint256) {
        return attendances[_attendanceId].totalStudents;
    }

    function getAttendanceRollNums(
        uint256 _attendanceId
    ) public view returns (uint256[] memory) {
        return attendances[_attendanceId].rollNums;
    }
}
