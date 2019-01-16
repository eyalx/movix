import React, { Fragment } from 'react';
import ReactDOM from 'react-dom'

const ModalTrigger = ({ onOpen, el }) => <button className='modal-trigger' onClick={ onOpen }>{ el }</button>;
  
const ModalContent = ({ content, onClose, onKeyDown}) =>
  ReactDOM.createPortal(
    <div className='modal' onKeyDown={ onKeyDown }>
      <button className='close-modal' onClick={ onClose } >
        <i className='fas fa-times'></i>
      </button>
      { content }
    </div>,
    document.getElementById('modal-root'));


export default class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: false }
  }

  onOpen = () => {
    this.setState({ isOpen: true });
    this.toggleScrollLock();
  }

  onClose = () => {
    this.setState({ isOpen: false });
    this.toggleScrollLock();
  };

  onKeyDown = (event) => {
    console.log(event.keyCode);
    return event.keyCode === 27 && this.onClose();
  }

  toggleScrollLock = () => 
    document.querySelector('html')
      .classList.toggle('lock-scroll');
  
  render() {
    const { isOpen } = this.state;
    const { triggerElement, children } = this.props;
    return (
      <Fragment>
        <ModalTrigger onOpen={ this.onOpen } el={ triggerElement } />
        { isOpen && <ModalContent content={ children } onClose={ this.onClose } onKeyDown={ this.onKeyDown } /> }
      </Fragment>
    );
  }
}