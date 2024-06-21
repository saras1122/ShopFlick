import Mountain2 from "../assest/people.png";
import AOS from 'aos';
import 'aos/dist/aos.css';
import "./CustomerStyle.css"
import Mountain1 from "../assest/happy1.jpg";
import { useEffect } from "react";
const Customer = () => {
    useEffect(() => {
        AOS.init({
            duration: 2000,
            once: true,
        });
    }, []);

    useEffect(() => {
        AOS.refresh();
    }, []);
    return (
        <>
            <br />
            <div class="customer">
                <div class="background">
                    <img src={Mountain1} alt="background image" />
                </div>
                <div className="overlay ">
                    <div className="top-left">
                        <img src={Mountain2} alt="image" data-aos="fade-right" />
                    </div>
                    <div class="top-right">
                        <h1 data-aos="fade-in" style={{ fontFamily: "Josefin Sans" }}>HAPPY CUSTOMERS</h1>
                        <p data-aos="fade-in">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, set amet.</p>
                        <br />
                        <p data-aos="fade-up-left" style={{ overflow: "hidden", }}>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh oui- sod
                            tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam,
                            quis nostrud exerci tation ullamcorper suscipit dolore magna aliquam erat voutpat. Ut wisi enim
                            ad minim veniam, quis nostrud exerci tation ullamcorper suscipit..</p>
                        <br />
                        <p className="over" data-aos="fade-up-left" style={{ overflow: "hidden" }}>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euisod tincidunt ut laoreet dolore magna aliquam erat
                            volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit.</p>
                    </div>
                </div>
            </div>


        </>
    )
}
export default Customer;