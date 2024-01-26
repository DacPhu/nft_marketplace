import React, {useState, useEffect, useContext} from 'react'
import { useRouter } from 'next/router';
import axios from 'axios';
import Image from 'next/image';

//INTERNAL IMPORT
import Style from '../styles/startSell.module.css'
import formStyle from '../AccountPage/Form/Form.module.css'
import { Button } from '../components/componentsindex';

//IMPORT SMART CONTRACT
import { NFTMarketplaceContext } from '../Context/NFTMarketplaceContext';

const startSell = () => {
    const {createSale} = useContext(NFTMarketplaceContext);
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState("");
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
        await createSale(id, price);
        router.push("/searchPage");
    };

  return (
    <div className={Style.startSellToken}>
        <div className= {Style.startSellToken_box}>
            <h1> startSell your token, set price</h1>
            <div className={formStyle.Form_box_input}>
                <label htmlFor="name">Price</label>
                <input
                    type="number"
                    placeholder="Price"
                    min={1}
                    className={formStyle.Form_box_input_userName}
                    onBlur={(e) => setPrice(e.target.value)}
                />
            </div>
            <div className={Style.startSellToken_box_image}> 
                {
                    image && <Image src = {image} alt="NFT" width={400} height={400}/>
                }
            </div>

            <div className={Style.startSellToken_box_btn}>
                <Button btnName="Listing" handleClick={() => start()} />
            </div>
        </div>
    </div>
  )
}

export default startSell