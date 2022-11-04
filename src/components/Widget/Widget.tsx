import React, { ReactNode, useEffect } from 'react';
import PropTypes from 'prop-types';
import s from './Widget.module.scss';
import classNames from 'classnames';
// import Loader from '../Loader'; // eslint-disable-line css-modules/no-unused-class
// import AnimateHeight from 'react-animate-height';
import uuidv4 from 'uuid/v4'
import { AnyObject } from 'chart.js/types/basic';
// import {
//   Button,
//   Modal,
//   ModalHeader,
//   ModalBody,
//   ModalFooter,
// } from 'reactstrap';


interface WidgetProps {
  title: string;
  children:React.ReactNode;
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
      <section
        // style={{ display: hideWidget ? 'none' : '' }}
        className={
          classNames('widget',
            s.widgetBorderLeft,
            // { 'fullscreened': !!fullscreened, 'collapsed': !!collapseWidget },
            s.widget,
            // (this.props.theme === "light" ? s.widgetLight : s.widgetDark),
            // className,
            // (reloading || fetchingData) ? s.reloading : ''
          )
        }
        style={{backgroundColor: props.whiteBackgroundColor? "#ffffff" : "transparent"}}
      // {...attributes}
      >
        {
          <div style={{ padding: "23px 30px 0" }}>
            <span
            style={{fontSize:"40px",fontWeight:"700"}}
            // className={[s.title, (this.props.theme === "light" ? s.titleLight : s.titleDark)]}
            >{props.children}
              </span>
          </div>
        }

        <div style={{ padding: "0 30px 23px" }} className={`${s.widgetBody} widget-body`}>
        {props.title}
        </div>

      </section>
      {/* <div style={{ display: fullscreened ? 'block' : 'none' }} className={s.widgetBackground}></div> */}
    </>
  )
}

export default Widget;