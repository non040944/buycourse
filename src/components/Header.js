import { Link } from "react-router-dom"
import { FiShoppingCart,FiUser,FiLogOut } from "react-icons/fi";
import "./Header.css";
function Header() {
    return(
        <div className="header">
            <div className='container'>
                <div className="header-buay">
                    <div className='logobuay'>
                        <Link to="/PageHome"><img src="/images/Logobuay.jpg" height="80" alt="not found"/></Link>
                    </div>
                    <ul className="menu">
                        <li className="menu-link">
                            <Link to="/Course"><span>คอร์สเรียน</span></Link>                    
                        </li>
                        <li className="menu-link">
                            <Link to="/Mycourse"><span>คอร์สเรียนของฉัน</span></Link>                    
                        </li>
                        <li className="menu-link">
                            <Link to="/FAQ"><span>คำถามที่พบบ่อย</span></Link>
                        </li>
                        <li className="menu-link">
                            <Link to="/PageContact"><span>ติดต่อเรา</span></Link>                        
                        </li>
                        <li className="menu-link">
                            <Link to="/Cart"><FiShoppingCart/></Link>
                        </li>
                        <li className="menu-link">
                            <Link to="/Member"><FiUser/></Link>
                        </li>
                        <li className="menu-link">
                            <Link to="/PageHomeout"><FiLogOut/></Link> 
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
export default Header;