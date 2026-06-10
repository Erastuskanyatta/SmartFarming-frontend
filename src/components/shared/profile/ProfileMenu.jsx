import React, { useEffect, useRef } from "react";
import {
  MdPerson,
  MdShoppingBag,
  MdInbox,
  MdStorefront,
  MdHelpOutline,
  MdExitToApp,
  MdChevronRight,
} from "react-icons/md";
import avatar from "../../assets/profile_photo.png";
import "./ProfileMenu.css";

const menuItems = [
  { icon: MdPerson, label: "My Account", desc: "Manage your profile" },
  { icon: MdShoppingBag, label: "Orders", desc: "Track & manage orders" },
  { icon: MdInbox, label: "Inbox", desc: "Messages & notifications" },
  { icon: MdStorefront, label: "My Listings", desc: "Products you're selling" },
  { icon: MdHelpOutline, label: "Help & Support", desc: "Get assistance" },
];

const ProfileMenu = ({ onClose }) => {
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <div className="profile-menu" ref={menuRef}>
      <div className="profile-menu-caret" />

      <div className="profile-menu-header">
        <img src={avatar} alt="avatar" className="profile-menu-avatar" />
        <div className="profile-menu-user">
          <span className="profile-menu-name">Erastus Kanyatta</span>
          <span className="profile-menu-email">erastusmuriithi146@gmail.com</span>
        </div>
      </div>

      <div className="profile-menu-divider" />

      <ul className="profile-menu-list">
        {menuItems.map(({ icon: Icon, label, desc }) => (
          <li key={label} className="profile-menu-item">
            <span className="profile-menu-item-icon">
              <Icon size={20} />
            </span>
            <span className="profile-menu-item-text">
              <span className="profile-menu-item-label">{label}</span>
              <span className="profile-menu-item-desc">{desc}</span>
            </span>
            <MdChevronRight size={18} className="profile-menu-item-arrow" />
          </li>
        ))}
      </ul>

      <div className="profile-menu-divider" />

      <button className="profile-menu-logout" onClick={onClose}>
        <MdExitToApp size={18} />
        Sign Out
      </button>
    </div>
  );
};

export default ProfileMenu;
