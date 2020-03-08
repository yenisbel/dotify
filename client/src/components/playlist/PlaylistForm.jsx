import React from "react";

class PlaylistForm extends React.component {
  
  render() {
    return (
      <div className="modal-background" onClick={ closeModal } >
        <div className="modal-child" onClick={e => e.stopPropagation()}>
          THIS IS THE MODAL
        </div>
      </div >
    )
  }
}

export default PlaylistForm;