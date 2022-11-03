import {
  Box,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem
} from '@mui/material';
import { useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import ExpandMoreTwoToneIcon from '@mui/icons-material/ExpandMoreTwoTone';
import logo from "../../../../images/logo.png";

const ListWrapper = styled(Box)(
  ({ theme }) => `
        .MuiTouchRipple-root {
            display: none;
        }
        
        .MuiListItem-root {
            transition: ${theme.transitions.create(['color', 'fill'])};
            
            &.MuiListItem-indicators {
                padding: ${theme.spacing(1, 2)};
            
                .MuiListItemText-root {
                    .MuiTypography-root {
                        &:before {
                            height: 4px;
                            width: 22px;
                            opacity: 0;
                            visibility: hidden;
                            display: block;
                            position: absolute;
                            bottom: -10px;
                            transition: all .2s;
                            border-radius: ${theme.general.borderRadiusLg};
                            content: "";
                        }
                    }
                }

                &.active,
                &:active,
                &:hover {
                
                    background: transparent;
                
                    .MuiListItemText-root {
                        .MuiTypography-root {
                            &:before {
                                opacity: 1;
                                visibility: visible;
                                bottom: 0px;
                            }
                        }
                    }
                }
            }

            &.active {
              .MuiListItemText-root {
                .MuiTypography-root {
                    font-weight:1000;
                    color:black;
                }
            }

            }
        }
      
`
);

function HeaderMenu() {
  const ref = useRef<any>(null);
  const [isOpen, setOpen] = useState<boolean>(false);

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  return (
    <>

      <ListWrapper
        sx={{
          display: {
            xs: 'none',
            md: 'block'
          }
        }}
      >
        <List disablePadding component={Box} display="flex">
          <ListItem>
            <div style={{ maxWidth: "200px", maxHeight: "80px" }}>
              <img
                style={{ maxWidth: "200px", maxHeight: "60px"}}
                // src={logo}
                src='/assets/logo/Loanshark_Logo-01.png'
                alt="Loan Shark"></img>
            </div>
          </ListItem>
          <ListItem>
            <div style={{ width: "300px" }}>
            </div>
          </ListItem>
          <ListItem
            classes={{ root: 'MuiListItem-indicators' }}
            button
            component={NavLink}
            to="/app/main/dashboard"
          >
            <ListItemText
              primaryTypographyProps={{ noWrap: true }}
              primary="Dashboard"
            />
          </ListItem>
          <ListItem
            classes={{ root: 'MuiListItem-indicators' }}
            button
            component={NavLink}
            to="/app/main/borrow"
          >
            <ListItemText
              primaryTypographyProps={{ noWrap: true }}
              primary="Borrow"
            />
          </ListItem>
          <ListItem
            classes={{ root: 'MuiListItem-indicators' }}
            button
            component={NavLink}
            to="/app/main/smartVault1"
          >
            <ListItemText
              primaryTypographyProps={{ noWrap: true }}
              primary="Smart Vault"
            />
          </ListItem>
          <ListItem
            classes={{ root: 'MuiListItem-indicators' }}
            button
            component={NavLink}
            to="/app/main/more"
          >
            <ListItemText
              primaryTypographyProps={{ noWrap: true }}
              primary="More"
            ></ListItemText>
          </ListItem>
        </List>
      </ListWrapper>
    </>
  );
}

export default HeaderMenu;
