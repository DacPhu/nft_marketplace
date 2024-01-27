// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import '@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol';
import '@openzeppelin/contracts/token/ERC721/ERC721.sol';

import 'hardhat/console.sol';

contract NFTMarketplace is ERC721URIStorage {
    uint256 private _tokenIds;
    uint256 private itemMarketCount;
    uint256 private itemAuctionCount;

    uint256 listingPrice = 0.025 ether;
    address payable owner;

    mapping(uint256 => MarketItem) private idToMarketItem;

    struct MarketItem {
        uint256 tokenId;
        address payable seller;
        address payable owner;
        uint256 price;
        bool sold;
        bool directSold;

        uint256 startTime;
        uint256 endTime;

        address payable highestBidder;
        uint256 highestBid;

        bool auctionCompleted;
    }

    constructor() ERC721('Metaverse Tokens', 'METT') {
        owner = payable(msg.sender);
        _tokenIds = 0;
        itemAuctionCount = 0;
        itemMarketCount = 0;
    }

    function updateListingPrice(uint256 _listingPrice) public payable {
        require(
            owner == msg.sender,
            'Only marketplace owner can update listing price.'
        );
        listingPrice = _listingPrice;
    }

    function getListingPrice() public view returns (uint256) {
        return listingPrice;
    }

    /* Mints a token and lists it in the marketplace */
    function createToken(string memory tokenURI)
        public
        payable
        returns (uint256)
    {
        _tokenIds++;
        uint256 newTokenId = _tokenIds;

        _mint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, tokenURI);
        idToMarketItem[newTokenId] = MarketItem(
            newTokenId, // tokenId
            payable(address(0)), // seller
            payable(address(msg.sender)), // owner
            0, // price
            true, // is sold
            true, // type sold
            0, // time start auction
            0, // time end auction
            payable(address(0)), // highest bidder
            0, // highest bid
            false // auction completed
        );
        return newTokenId;
    }

    function createMarketItem(uint256 tokenId, uint256 price) public payable {
        require(price > 0, 'Price must be at least 1 wei');
        require(
            idToMarketItem[tokenId].owner == msg.sender,
            'Only item owner can perform this operation'
        );

        idToMarketItem[tokenId] = MarketItem(
            tokenId,
            payable(msg.sender), 
            payable(address(this)), 
            price, 
            false, 
            true, 
            0, 
            0, 
            payable(address(0)), 
            price, 
            false 
        );
        itemMarketCount++;
        _transfer(msg.sender, address(this), tokenId);
    }

    function startAuction(uint256 tokenId, uint256 price, uint256 durations) public payable {
        require(
            idToMarketItem[tokenId].owner == msg.sender,
            'Only item owner can perform this operation'
        );

        idToMarketItem[tokenId] = MarketItem(
            tokenId, // tokenId
            payable(msg.sender), // seller
            payable(address(this)), // owner
            price, // price
            false, // is sold
            false, // type sold
            block.timestamp, // time start auction
            block.timestamp + durations, // time end auction
            payable(msg.sender), // highest bidder
            price, // highest bid
            false // auction completed
        );

        itemAuctionCount++;
        _transfer(msg.sender, address(this), tokenId);
    }

    function placeBid(uint256 tokenId) public payable{
        MarketItem storage auction = idToMarketItem[tokenId];

        require(block.timestamp >= auction.startTime, "Auction not yet started");
        require(auction.highestBidder != msg.sender, "Cannot bid twice in a row");

        if(auction.highestBidder != auction.seller){
            address payable previousBidder = payable(auction.highestBidder);
            previousBidder.transfer(auction.highestBid);
        }

        auction.highestBid = msg.value;
        auction.highestBidder = payable(msg.sender);
        payable(auction.seller).transfer(msg.value);
        idToMarketItem[tokenId] = auction;
    }

    function getTimeEndOfAuction(uint256 tokenId) public view returns (uint256){
        MarketItem storage auction = idToMarketItem[tokenId];
        return auction.endTime;
    }

    function finishAuction(uint256 tokenId) public payable{
        MarketItem storage auction = idToMarketItem[tokenId];
        require(msg.sender == auction.seller, "Only the token owner can end the auction");
        itemAuctionCount--;
        _transfer(address(this), auction.highestBidder, tokenId);
        auction.auctionCompleted = true;
        auction.sold = true;
        auction.owner = auction.highestBidder;
        auction.seller = payable(address(0));
        idToMarketItem[tokenId] = auction;
    }

    function cancelAuction(uint256 tokenId) public payable{
        MarketItem storage auction = idToMarketItem[tokenId];
        require(msg.sender == auction.seller, "Only owner can cancel auction");
        itemAuctionCount--;
        if(auction.highestBidder != auction.seller){
            payable(auction.highestBidder).transfer(auction.highestBid);
        }
        idToMarketItem[tokenId].owner = payable(msg.sender);
        idToMarketItem[tokenId].seller = payable(address(0));
        _transfer(address(this), msg.sender, tokenId);
    }

    // Sold
    function createMarketSale(uint256 tokenId) public payable {
        uint256 price = idToMarketItem[tokenId].price;
        require(
            msg.value == price,
            'Please submit the asking price in order to complete the purchase'
        );
        idToMarketItem[tokenId].owner = payable(msg.sender);
        idToMarketItem[tokenId].sold = true;

        itemMarketCount--;
        _transfer(address(this), msg.sender, tokenId);
        payable(owner).transfer(listingPrice);
        payable(idToMarketItem[tokenId].seller).transfer(msg.value);
        idToMarketItem[tokenId].seller = payable(address(0));
    }

    function cancelSelling(uint256 tokenId) public payable{
        require(msg.sender == idToMarketItem[tokenId].seller, "Only owner can cancel selling");
        itemMarketCount--;
        _transfer(address(this), msg.sender, tokenId);
        idToMarketItem[tokenId].owner = payable(msg.sender);
        idToMarketItem[tokenId].seller = payable(address(0));
    }

    function fetchMarketItems() public view returns (MarketItem[] memory) {
        uint256 totalItemCount = _tokenIds;
        uint256 unsoldItemCount = itemMarketCount;
        uint256 currentIndex = 0;

        MarketItem[] memory items = new MarketItem[](unsoldItemCount);
        for (uint256 i = 0; i < totalItemCount; i++) {
            if (idToMarketItem[i + 1].owner == address(this) 
            && idToMarketItem[i + 1].directSold == true
            && idToMarketItem[i + 1].sold == false) {
                uint256 currentId = i + 1;
                MarketItem storage currentItem = idToMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    function fetchMyNFTs() public view returns (MarketItem[] memory) {
        uint256 totalItemCount = _tokenIds;
        uint256 itemCount = 0;
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < totalItemCount; i++) {
            if (idToMarketItem[i + 1].owner == msg.sender) {
                itemCount += 1;
            }
        }

        MarketItem[] memory items = new MarketItem[](itemCount);
        for (uint256 i = 0; i < totalItemCount; i++) {
            if (idToMarketItem[i + 1].owner == msg.sender) {
                uint256 currentId = i + 1;
                MarketItem storage currentItem = idToMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    function fetchItemsListed() public view returns (MarketItem[] memory) {
        uint256 totalItemCount = _tokenIds;
        uint256 itemCount = 0;
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < totalItemCount; i++) {
            if (idToMarketItem[i + 1].seller == msg.sender && idToMarketItem[i + 1].directSold == true) {
                itemCount += 1;
            }
        }

        MarketItem[] memory items = new MarketItem[](itemCount);
        for (uint256 i = 0; i < totalItemCount; i++) {
            if (idToMarketItem[i + 1].seller == msg.sender && idToMarketItem[i + 1].directSold == true) {
                uint256 currentId = i + 1;
                MarketItem storage currentItem = idToMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    function fetchAllAuctionItems() public view returns (MarketItem[] memory) {
        uint256 totalItemCount = _tokenIds;
        uint256 itemCount = itemAuctionCount;
        uint256 currentIndex = 0;

        MarketItem[] memory items = new MarketItem[](itemCount);
        for (uint256 i = 0; i < totalItemCount; i++) {
            if (idToMarketItem[i + 1].owner == address(this) 
            && idToMarketItem[i + 1].directSold == false
            && idToMarketItem[i + 1].sold == false) {
                uint256 currentId = i + 1;
                MarketItem storage currentItem = idToMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    function fetchMyAuctionItems() public view returns (MarketItem[] memory) {
        uint256 totalItemCount = _tokenIds;
        uint256 itemCount = 0;
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < totalItemCount; i++) {
            if (idToMarketItem[i + 1].seller == msg.sender
            && idToMarketItem[i + 1].directSold == false
            && idToMarketItem[i + 1].sold == false) 
                itemCount++;
        }

        MarketItem[] memory items = new MarketItem[](itemCount);
        for (uint256 i = 0; i < totalItemCount; i++) {
            if (idToMarketItem[i + 1].seller == msg.sender
            && idToMarketItem[i + 1].directSold == false
            && idToMarketItem[i + 1].sold == false) {
                uint256 currentId = i + 1;
                MarketItem storage currentItem = idToMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }
}