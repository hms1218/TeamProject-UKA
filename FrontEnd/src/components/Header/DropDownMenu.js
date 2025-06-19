import { useState } from "react";
import { Link } from "react-router-dom";
import './MainHeader.css';

const DropDownMenu = ({ title, to, items }) => {
    const [open, setOpen] = useState(false);

    return (
        <div className="dropdown"
             onMouseEnter={() => setOpen(true)}
             onMouseLeave={() => setOpen(false)}
        >
            <span className="dropdown-title">
                <Link to={to}>{title}</Link>
                <span className="arrow">▼</span>
            </span>
            {open && (
                <div className="dropdown-menu">
                    {items.map((item, idx) => (
                        <Link key={idx} to={item.to}>{item.label}</Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default DropDownMenu;
