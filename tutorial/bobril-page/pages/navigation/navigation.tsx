import * as b from "bobril";
import * as routes from "../../routes";
import {
  Collapse,
  Navbar,
  Container,
  NavbarHeader,
  Button,
  ButtonVariant,
  NavbarBrand,
  navStyles,
  helpers,
  NavbarCollapse,
  NavbarNav,
  NavbarNavItem,
  Target,
  NavbarStatic
} from "bobrilstrap";
import { observable } from "bobx";

export class Navigation extends b.Component<{}> {
  @observable collapsedMenu: boolean = true;

  render(): b.IBobrilChildren {
    return (
      <Navbar header static={NavbarStatic.Top}>
        <Container fluid>
          <NavbarHeader>
            <NavbarBrand>
              <div onClick={this.goHome}>
                <img
                  src={b.asset("../../resources/bobril_logo_50x50.png")}
                  height={20}
                  style={positionedLogo}
                />
                Bobril
              </div>
            </NavbarBrand>
            <Button
              variant={ButtonVariant.NavbarToggle}
              onClick={() => this.toggleMenu()}
            >
              <span style={helpers.srOnly}>Toggle navigation</span>
              <span style={navStyles.iconBar} />
              <span style={navStyles.iconBar} />
              <span style={navStyles.iconBar} />
            </Button>
          </NavbarHeader>
          <Collapse collapsed={this.collapsedMenu}>
            <NavbarCollapse>
              <NavbarNav>
                <NavbarNavItem
                  onClick={() => this.handleMenuItemClick()}
                  active={b.isActive(routes.gettingStarted.name)}
                >
                  <a href={b.urlOfRoute(routes.gettingStarted.name!)}>
                    Get Started
                  </a>
                </NavbarNavItem>
                <NavbarNavItem
                  onClick={() => this.handleMenuItemClick()}
                  active={b.isActive(routes.ecoSystem.name)}
                >
                  <a href={b.urlOfRoute(routes.ecoSystem.name!)}>Eco-System</a>
                </NavbarNavItem>{" "}
                <NavbarNavItem
                  onClick={() => this.handleMenuItemClick()}
                  active={b.isActive(routes.moreTutorials.name)}
                >
                  <a href={b.urlOfRoute(routes.moreTutorials.name!)}>
                    More Tutorials
                  </a>
                </NavbarNavItem>
              </NavbarNav>
              <NavbarNav style={navStyles.navbarRight}>
                <NavbarNavItem onClick={() => this.handleMenuItemClick()}>
                  <a
                    href="https://badge.fury.io/js/bobril"
                    target={Target.Blank}
                  >
                    <img
                      src="https://badge.fury.io/js/bobril.svg"
                      alt="npm version"
                      height={18}
                    />
                  </a>
                </NavbarNavItem>
                <NavbarNavItem onClick={() => this.handleMenuItemClick()}>
                  <a
                    href="https://github.com/Bobris/Bobril"
                    target={Target.Blank}
                  >
                    GitHub
                  </a>
                </NavbarNavItem>
              </NavbarNav>
            </NavbarCollapse>
          </Collapse>
        </Container>
      </Navbar>
    );
  }

  private toggleMenu(): void {
    this.collapsedMenu = !this.collapsedMenu;
  }

  private handleMenuItemClick(): boolean {
    this.collapsedMenu = true;
    return false;
  }

  @b.bind
  private goHome(): boolean {
    b.runTransition(b.createRedirectPush(routes.defaultRoute.name!));
    return true;
  }
}

const positionedLogo = b.styleDef({ marginRight: 5, marginBottom: 3 });
