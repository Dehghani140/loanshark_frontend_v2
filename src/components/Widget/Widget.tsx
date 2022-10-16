import React, { ReactNode, useEffect } from 'react';
import PropTypes from 'prop-types';
import s from './Widget.module.scss';
import classNames from 'classnames';
// import Loader from '../Loader'; // eslint-disable-line css-modules/no-unused-class
// import AnimateHeight from 'react-animate-height';
import uuidv4 from 'uuid/v4'
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
  // label: string;
  // onClick: any;
}


function Widget(props: WidgetProps) {
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
      // {...attributes}
      >
        {
          <h5
          // className={[s.title, (this.props.theme === "light" ? s.titleLight : s.titleDark)]}
          >{props.title}</h5>
        }

        <div className={`${s.widgetBody} widget-body`}>
          {props.children}
        </div>

      </section>
      {/* <div style={{ display: fullscreened ? 'block' : 'none' }} className={s.widgetBackground}></div> */}
    </>
  )
}

export default Widget;