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
  Image,
  navStyles,
  helpers,
  NavbarCollapse,
  NavbarNav,
  NavbarNavItem,
  Target
} from "bobrilstrap";
import { observable } from "bobx";

export class Navigation extends b.Component<{}> {
  @observable collapsedMenu: boolean = true;

  render(): b.IBobrilChildren {
    return (
      <Navbar>
        <Container fluid>
          <NavbarHeader>
            <NavbarBrand>
              <div>
                <Image
                  src={b.asset("../../resources/bobril-logo-small2.png")}
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
                  <b.Link name={routes.gettingStarted.name!}>
                    <a>Get Started</a>
                  </b.Link>
                </NavbarNavItem>
                <NavbarNavItem
                  onClick={() => this.handleMenuItemClick()}
                  active={b.isActive(routes.ecoSystem.name)}
                >
                  <b.Link name={routes.ecoSystem.name!}>
                    <a>Eco-System</a>
                  </b.Link>
                </NavbarNavItem>
              </NavbarNav>
              <NavbarNav style={navStyles.navbarRight}>
                <NavbarNavItem onClick={() => this.handleMenuItemClick()}>
                  <a
                    href="https://badge.fury.io/js/bobril"
                    target={Target.Blank}
                  >
                    <Image
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
}

const positionedLogo = b.styleDef({ marginRight: 5, marginBottom: 3 });
