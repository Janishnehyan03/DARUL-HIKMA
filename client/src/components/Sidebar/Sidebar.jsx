import {
  SideBarContainer,
  Icon,
  CloseIcon,
  SidebarWrapper,
  SidebarLink,
  SideBtnWrap,
  SidebarMenu,
  SidebarRoutes,
} from "./SidebarElements";

function Sidebar({ isOpen, toggle }) {
  return (
    <SideBarContainer isOpen={isOpen} onClick={toggle}>
      <Icon onClick={toggle}>
        <CloseIcon  />
      </Icon>
      <SidebarWrapper>
        <SidebarMenu>
          <SidebarLink to="/about">About</SidebarLink>
          <SidebarLink to="/services">Services</SidebarLink>
          <SidebarLink to="/discover">Discover</SidebarLink>
          <SidebarLink to="/signUp">Sign Up</SidebarLink>
        </SidebarMenu>
        <SideBtnWrap>
          <SidebarRoutes to="/donation">Donate Us </SidebarRoutes>
        </SideBtnWrap>
      </SidebarWrapper>
    </SideBarContainer>
  );
}

export default Sidebar;
