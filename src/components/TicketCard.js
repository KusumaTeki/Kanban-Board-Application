

import React from "react";
import "../styles/TicketCard.css";
import { ReactComponent as NoPriorityIcon } from "../icons_FEtask/No-priority.svg";
import { ReactComponent as UrgentIcon } from "../icons_FEtask/SVG - Urgent Priority grey.svg";
import { ReactComponent as HighIcon } from "../icons_FEtask/Img - High Priority.svg";
import { ReactComponent as MediumIcon } from "../icons_FEtask/Img - Medium Priority.svg";
import { ReactComponent as LowIcon } from "../icons_FEtask/Img - Low Priority.svg";
import { ReactComponent as TodoIcon } from "../icons_FEtask/To-do.svg";
import { ReactComponent as InProgressIcon } from "../icons_FEtask/in-progress.svg";
import { ReactComponent as BacklogIcon } from "../icons_FEtask/Backlog.svg";

const priorityIconMap = {
  0: <NoPriorityIcon />,
  1: <LowIcon />,
  2: <MediumIcon />,
  3: <HighIcon />,
  4: <UrgentIcon />,
};



const statusIconMap = {
  Todo: <TodoIcon />, 
  "In progress": <InProgressIcon />,
  Backlog: <BacklogIcon />,
};



const TicketCard = ({ ticket, userName, grouping, sortBy }) => {
  let icon;
  if (grouping === "priority") {
    icon = priorityIconMap[ticket.priority];
    } else if (grouping === "status") {
      icon = statusIconMap[ticket.status];
    } else if (grouping === "user") {
      icon = priorityIconMap[ticket.priority];
    } else {
    icon = null;
  }

  return (
    <div className="ticket-card">
      <div className="ticket-details">
        <div className="ticket-id">
          <span id="ticket-id">{ticket.id}</span>
        </div>
        <div className="icon-title">
          <h3>{ticket.title}</h3>
        </div>
        <div className="feature">
          {icon && <span className="icon" id="icon" >{icon}</span>}
          <span id="feature">Feature request</span>
        </div>
      </div>
    </div>
  );
};

export default TicketCard;
