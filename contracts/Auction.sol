// SPDX-License-Identifier: MIT
pragma solidity >=0.8.19;

// interface IERC721 {
//     function safeTransferFrom(address from, address to, uint tokenId) external;

//     function transferFrom(address, address, uint) external;
// }

// contract Auction {
//     event Start(address _nft, uint256 _tokenId, uint256 startingPrice);
//     event Bid(address indexed sender, uint256 amount);
//     event Withdraw(address indexed bidder, uint256 amount);
//     event End(address winner, uint256 amount);

//     uint256 private _tokenIds;
//     uint256 private _itemsSold;

//     IERC721 public nft;
//     address payable owner;

//     mapping(uint256 => AuctionItem) public idToAuctionItem;

//     struct AuctionItem{
//         uint256 tokenId;
//         address payable seller;
//         address highestBidder;
//         uint256 highestBid;
//         bool started;
//         bool ended;
//         uint256 endAt;
//     }

//     constructor() {
//         owner = payable(msg.sender);
//         _tokenIds = 0;
//     }

//     function start(address _nft, uint256 _tokenId, uint256 price) external {
//         nft = IERC721(_nft);
//         uint256 tokenId = _tokenId;
//         nft.transferFrom(msg.sender, address(this), tokenId);
//         bool started = true;
//         uint256 highestBid = price;
//         uint256 endAt = block.timestamp + 7 days;

//         idToAuctionItem[tokenId] = AuctionItem(
//             tokenId,
//             payable(msg.sender),
//             payable(address(0)),
//             price,
//             true,
//             false,
//             endAt
//         );

//         emit Start(_nft, _tokenId, price);
//     }

//     function bid(uint256 tokenId, uint256 price) external payable {
//         if (idToAuctionItem[tokenId].highestBidder != address(0)) {
//             // idToAuctionItem[tokenId]. = highestBid;
//         }

//         highestBidder = msg.sender;
//         highestBid = msg.value;

//         emit Bid(msg.sender, msg.value);
//     }

//     function withdraw() external {
//         uint bal = bids[msg.sender];
//         bids[msg.sender] = 0;
//         payable(msg.sender).transfer(bal);

//         emit Withdraw(msg.sender, bal);
//     }

//     function end() external {
//         require(started, "not started");
//         require(block.timestamp >= endAt, "not ended");
//         require(!ended, "ended");

//         ended = true;
//         if (highestBidder != address(0)) {
//             nft.safeTransferFrom(address(this), highestBidder, tokenId);
//             seller.transfer(highestBid);
//         } else {
//             nft.safeTransferFrom(address(this), seller, tokenId);
//         }

//         emit End(highestBidder, highestBid);
//     }

//     function fetchAuctionItems() public view returns(AuctionItem[] memory){
//         uint256 itemCount = _tokenIds;
//         uint256 currentAuctionCount = _tokenIds - _itemsSold;
//         uint256 currentIndex = 0;

//         AuctionItem[] memory items = new AuctionItem[](currentAuctionCount);

//         for (uint256 i = 0; i < itemCount; ++i){
//             if(idToAuctionItem[i + 1].seller == address(this)){
//                 uint256 currentId = i + 1;
//                 AuctionItem storage currentItem = idToAuctionItem[currentId];
//                 items[currentIndex] = currentItem;
//                 currentIndex++;
//             }
//         }
//         return items;
//     }   
// }

import '@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol';
import '@openzeppelin/contracts/token/ERC721/IERC721.sol';
import '@openzeppelin/contracts/token/ERC721/ERC721.sol';

contract Auction is ERC721URIStorage {

    uint256 public constant AUCTION_SERVICE_FEE_RATE = 3;
    uint256 public constant MINIMUM_BID_RATE = 110;

    address payable public owner;

    constructor() ERC721("Metaverse Auction Tokens", "METAT") {
        owner = payable(msg.sender);
    }

    struct AuctionInfo {
        address auctioneer;
        uint256 tokenId;
        uint256 initialPrice;
        address previousBidder;
        uint256 lastBid;
        address lastBidder;
        uint256 startTime;
        uint256 endTime;
        bool completed;
        bool active;
        uint256 auctionId;
    }

    event AuctionItemCreated(
        address auctioneer,
        uint256 tokenId,
        uint256 initialPrice,
        address previousBidder,
        uint256 lastBid,
        address lastBidder,
        uint256 startTime,
        uint256 endTime,
        bool completed,
        bool active,
        uint256 auctionId
    );


    AuctionInfo[] public auctions;

    // Create a new auction
    function createAuction(uint256 _tokenId, uint256 _initialPrice, uint256 _startTime, uint256 _endTime) public {
        require(block.timestamp <= _startTime, "Auction cannot start yet");
        require(_startTime < _endTime, "Invalid auction times");
        require(_initialPrice > 0, "Initial price must be greater than 0");
        require(ownerOf(_tokenId) == msg.sender, "You must own the token");
        require(isApprovedForAll(ownerOf(_tokenId), address(this)), "Contract needs approval");

        _transfer(msg.sender, address(this), _tokenId);

        AuctionInfo memory newAuction = AuctionInfo(
            msg.sender,
            _tokenId,
            _initialPrice,
            address(0),
            _initialPrice,
            address(0),
            _startTime,
            _endTime,
            false,
            true,
            auctions.length
        );

        auctions.push(newAuction);
        emit AuctionItemCreated(
            msg.sender,
            _tokenId,
            _initialPrice,
            address(0),
            _initialPrice,
            address(0),
            _startTime,
            _endTime,
            false,
            true,
            auctions.length
        );
    }

    // Place a bid in an active auction
    function joinAuction(uint256 _auctionId, uint256 _bid) public {
        AuctionInfo storage _auction = auctions[_auctionId];
        require(block.timestamp >= _auction.startTime, "Auction not yet started");
        require(!_auction.completed, "Auction already completed");
        require(_auction.active, "Auction is not active");

        uint256 minBid = _auction.lastBidder == address(0) ? _auction.initialPrice : (_auction.lastBid * MINIMUM_BID_RATE) / 100;
        require(_bid >= minBid, "Bid too low");

        require(balanceOf(msg.sender) >= _bid, "Insufficient balance");
        require(msg.sender != _auction.auctioneer, "Cannot bid on your own auction");

        transferFrom(owner, msg.sender, _auction.tokenId);

        if (_auction.lastBidder != address(0)) {
            payable(_auction.auctioneer).transfer(_auction.lastBid);
            // _transfer(_auction.auctioneer, _auction.lastBid, _auction.tokenId);
        }

        _auction.previousBidder = _auction.lastBidder;
        _auction.lastBidder = msg.sender;
        _auction.lastBid = _bid;
    }

    // Finish an auction
    function finishAuction(uint256 _auctionId) public {
        AuctionInfo storage _auction = auctions[_auctionId];
        require(msg.sender == _auction.auctioneer || msg.sender == owner, "Not authorized");
        require(!_auction.completed, "Auction already completed");
        require(_auction.active, "Auction not active");

        transferFrom(address(this), _auction.lastBidder, _auction.tokenId);

        uint256 profit = _auction.lastBid - _auction.initialPrice;
        uint256 auctioneerServiceFee = (profit * AUCTION_SERVICE_FEE_RATE) / 100;
        uint256 auctioneerReceive = _auction.lastBid - auctioneerServiceFee;

        payable(_auction.auctioneer).transfer(auctioneerReceive);
        // _transfer(_auction.auctioneer, auctioneerReceive, _auction.tokenId);

        _auction.completed = true;
        _auction.active = false;
    }

    // Cancel an auction
    function cancelAuction(uint256 _auctionId) public {
        AuctionInfo storage _auction = auctions[_auctionId];
        require(msg.sender == _auction.auctioneer || msg.sender == owner, "Not authorized");
        require(!_auction.completed, "Auction already completed");
        require(_auction.active, "Auction not active");

        safeTransferFrom(address(this), _auction.auctioneer, _auction.tokenId);

        if (_auction.lastBidder != address(0)) {
            payable(_auction.lastBidder).transfer(_auction.lastBid);
        }

        _auction.completed = true;
        _auction.active = false;
    }

    // Get details of a specific auction
    function getAuction(uint256 _auctionId) public view returns (AuctionInfo memory) {
        return auctions[_auctionId];
    }

    // Get active or inactive auctions
    function getAuctionsByStatus(bool _active) public view returns (AuctionInfo[] memory) {
        uint256 count = 0;
        for (uint256 i = 0; i < auctions.length; i++) {
            if (auctions[i].active == _active) {
                count++;
            }
        }

        AuctionInfo[] memory results = new AuctionInfo[](count);
        uint256 index = 0;
        for (uint256 i = 0; i < auctions.length; i++) {
            if (auctions[i].active == _active) {
                results[index] = auctions[i];
                index++;
            }
        }
        return results;
    }
}