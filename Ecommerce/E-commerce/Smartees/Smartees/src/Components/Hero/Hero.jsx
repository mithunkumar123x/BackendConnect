// import hand_icon from '../Assets/hand_icon.png'
import arrow_icon from '../Assets/arrow.png'
import hero_image from '../Assets/hero_image.png'
import './Hero.css'
export const Hero = () => {
    return (
        <div>
          <div className="hero-left">
           <h2>NEW ARRIVALS ONLY</h2>
           <div>
             <div className="hand-hand-icon">
               <p>new</p>
              
             </div>
             <p>Collections</p>
             <p>for everyone</p>
           </div>
           <div className='hero-latest-btn'>
              <div>Latest Collections</div>
              <img src = {arrow_icon} alt='' />
           </div>
          </div>
          <div className="hero-right">
            <img src={hero_image} alt="" />
          </div>
        </div>
    )
}