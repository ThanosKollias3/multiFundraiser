// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Fundraisers {
    address public contranctOwner;

    constructor(address payable _contractOwner) {
        contranctOwner = _contractOwner;
    }

    uint256 public fundraiserscount;
    uint256 public increaserscount;
    uint256 public balance;
    mapping(address => Fundraiser) public ownersAddress;

    event NewFundraiser(
        uint256 id,
        string _name,
        uint256 _amount,
        address _fundraiserCreator
    );
    event PriceIncreaser(
        uint256 id,
        string _name,
        uint256 _amount,
        address _fundraiserCreator
    );
    event Deposit(uint256 _depositAmount);

    event FundraiserCompleted(
        string _name,
        uint256 _amount,
        address _fundraiserCreator
    );
    struct Fundraiser {
        string FundraiserName;
        uint256 priceNeeded;
        uint256 Balance;
        address fundraiserCreator;
        bool isFundraiser;
    }

    function deposit(address _ownersAddress) public payable {
        ownersAddress[_ownersAddress].Balance += msg.value;
        emit Deposit(msg.value);
    }

    function PriceIncrease(uint256 _newPrice) public {
        require(
            msg.sender == ownersAddress[msg.sender].fundraiserCreator,
            "Only the Creator of The Fundraiser Can Do That"
        );
        ownersAddress[msg.sender].priceNeeded = _newPrice;
        increaserscount++;
        emit PriceIncreaser(
            increaserscount,
            ownersAddress[msg.sender].FundraiserName,
            _newPrice,
            ownersAddress[msg.sender].fundraiserCreator
        );
    }

    function StartNewFund(string memory _name, uint256 _price) public {
        require(
            !ownersAddress[msg.sender].isFundraiser,
            "You already have a Fundraiser"
        );
        ownersAddress[msg.sender] = Fundraiser(
            _name,
            _price,
            0,
            msg.sender,
            true
        );
        fundraiserscount++;
        emit NewFundraiser(fundraiserscount, _name, _price, msg.sender);
    }

    function BalanceOf(address _ownersAddress) public view returns (uint256) {
        return ownersAddress[_ownersAddress].Balance;
    }

    function transferTo(address payable _to) public {
        require(
            msg.sender == ownersAddress[msg.sender].fundraiserCreator,
            "Only the Creator of The Fundraiser Can Do That"
        );
        _to.transfer(ownersAddress[msg.sender].priceNeeded);
        ownersAddress[msg.sender].Balance =
            ownersAddress[msg.sender].Balance -
            ownersAddress[msg.sender].priceNeeded;
        ownersAddress[msg.sender] = Fundraiser(
            "",
            0,
            0,
            0x0000000000000000000000000000000000000000,
            false
        );
        emit FundraiserCompleted(
            ownersAddress[msg.sender].FundraiserName,
            ownersAddress[msg.sender].priceNeeded,
            ownersAddress[msg.sender].fundraiserCreator
        );
    }
}
