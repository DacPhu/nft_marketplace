import React, {useState, useEffect, useContext} from 'react'
import { useRouter } from 'next/router';
import axios from 'axios';
import Image from 'next/image';

//INTERNAL IMPORT
import Style from '../styles/startAuction.module.css'
import formStyle from '../AccountPage/Form/Form.module.css'
import { Button } from '../components/componentsindex';

//IMPORT SMART CONTRACT
import { NFTMarketplaceContext } from '../Context/NFTMarketplaceContext';

const Auction = () => {
    const {startAuction} = useContext(NFTMarketplaceContext);
    const [price, setPrice] = useState("");
    const [time, setTime] = useState("");
    const [image, setImage] = useState('');
    const router = useRouter();
    const {id, tokenURI} = router.query;

    const fetchNFT = async() => {
        if(!tokenURI) 
            return;
        
        const {data} = await axios.get(tokenURI);

        setImage(data.image);
    };

    useEffect(() => {
        fetchNFT();
    }, [id]);

    const start = async() => {
        await startAuction(id, price, 7);
        console.log()
        router.push("/author");
    };

  return (
    <div className={Style.startAuction}>
        <div className= {Style.startAuction_box}>
            <h1> Start your auction, set initial price</h1>
            <div className={formStyle.Form_box_input}>
                <label htmlFor="name">Start price</label>
                <input
                    type="number"
                    placeholder="Price"
                    min={1}
                    className={formStyle.Form_box_input_userName}
                    onChange={(e) => setPrice(e.target.value)}
                />
            </div>
            <div className={formStyle.Form_box_input}>
                <label htmlFor="name">Durations</label>
                <input
                    type="number"
                    placeholder="Time"
                    min={1}
                    className={formStyle.Form_box_input_userName}
                    onChange={(e) => setTime(e.target.value)}
                />
            </div>
            <div className={Style.startAuction_box_image}> 
                {
                    image && <Image src = {image} alt="Auction NFT" width={400} height={400}/>
                }
            </div>

            <div className={Style.startAuction_box_btn}>
                <Button btnName="Start Auction" handleClick={() => start()} />
            </div>
        </div>
    </div>
  )
}

export default Auction;