import React, { ReactNode, useEffect } from 'react';
import PropTypes from 'prop-types';
import s from './Widget.module.scss';
import classNames from 'classnames';
// import Loader from '../Loader'; // eslint-disable-line css-modules/no-unused-class
// import AnimateHeight from 'react-animate-height';
import uuidv4 from 'uuid/v4'
import { Grid } from '@mui/material';
// import {
//   Button,
//   Modal,
//   ModalHeader,
//   ModalBody,
//   ModalFooter,
// } from 'reactstrap';


interface WidgetProps {
  title: string;
  children: React.ReactNode;
  whiteBackgroundColor?: boolean;
  // label: string;
  // onClick: any;
}

const defaultProps = {
  whiteBackgroundColor: false
}

function Widget(props: WidgetProps) {

  props = { ...defaultProps, ...props }

  useEffect(() => {
    console.log(`widget`)
  }, [])

  return (
    <>
      
      <div style={{
        borderRadius: '6px',
        boxShadow: '0px 0px 10px rgba(138,171,170, 0.3)',
        opacity: '0.902725',
        background: "linear-gradient(180deg, rgba(253, 251, 251, 0.4) 100%, rgba(235, 237, 238, 0.6) 100%)",
        padding: "18px 40px 29px 40px",
      }}>
        <Grid container>
          <Grid item xs={12}>
          {
          <div>
            <span
              style={{ 
                color: 'rgba(38,38,38,1)',
                fontFamily: 'poppins',
                fontSize: '48px',
                fontWeight: '700',
              }}
            >{props.children}
            </span>
          </div>
        }
          </Grid>
          <Grid item xs={12}>
          <div className={`${s.widgetTitle}`} style={{fontFamily: 'ClashDisplay-SemiBold' }}>  
          {props.title}
        </div>
          </Grid>
        </Grid>
      </div>

    </>
  )
}

export default Widget;


// border - radius: 6px;
// box - shadow: 2px 2px 10px rgba(116, 116, 128, 0.076022);
// opacity: 0.7;
// background - color: rgba(255, 255, 255, 1);

// border - radius: 6px;
// box - shadow: 2px 2px 10px rgba(116, 116, 128, 0.076022);
// opacity: 0.7;
// background - color: rgba(255, 255, 255, 1);

// <section
//         className={
//           classNames('widget',
//             s.widgetBorderLeft,
//             s.widget,
//           )
//         }
//         style={{ backgroundColor: props.whiteBackgroundColor ? "#ffffff" : "transparent" }}
//       >
        
        
//       </section>