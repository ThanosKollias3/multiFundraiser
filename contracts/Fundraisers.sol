// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Fundraisers {
    address public immutable i_contractowner;

    constructor() {
        i_contractowner = msg.sender;
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
    event Deposit(uint256 _depositAmount, address indexed sender, string _name);

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
        require(
            ownersAddress[_ownersAddress].Balance <
                ownersAddress[_ownersAddress].priceNeeded,
            "The Fundraiser has reached the required Price"
        );
        require(
            msg.value <= ownersAddress[_ownersAddress].priceNeeded,
            "Can't deposit more than the Fundraiser requires"
        );
        ownersAddress[_ownersAddress].Balance += msg.value;
        emit Deposit(
            msg.value,
            msg.sender,
            ownersAddress[_ownersAddress].FundraiserName
        );
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

    //136257
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
        (bool callSuccess, ) = payable(_to).call{
            value: ownersAddress[msg.sender].priceNeeded
        }("");
        require(
            callSuccess,
            "Transfer Failed,The Fundraiser did not reache the required Price"
        );
        emit FundraiserCompleted(
            ownersAddress[msg.sender].FundraiserName,
            ownersAddress[msg.sender].priceNeeded,
            ownersAddress[msg.sender].fundraiserCreator
        );
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
    }
}
