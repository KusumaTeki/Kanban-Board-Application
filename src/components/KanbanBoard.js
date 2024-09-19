import React, { useState, useEffect } from "react";
import TicketCard from "./TicketCard";
import { getTicketsFromAPI } from "../utils/api";
import "../styles/KanbanBoard.css";
import CustomDropdown from "./CustomDropdown";
import { ReactComponent as NoPriorityIcon } from "../icons_FEtask/No-priority.svg";
import { ReactComponent as UrgentIcon } from "../icons_FEtask/SVG - Urgent Priority colour.svg";
import { ReactComponent as HighIcon } from "../icons_FEtask/Img - High Priority.svg";
import { ReactComponent as MediumIcon } from "../icons_FEtask/Img - Medium Priority.svg";
import { ReactComponent as LowIcon } from "../icons_FEtask/Img - Low Priority.svg";
import { ReactComponent as TodoIcon } from "../icons_FEtask/To-do.svg";
import { ReactComponent as InProgressIcon } from "../icons_FEtask/in-progress.svg";
import { ReactComponent as BacklogIcon } from "../icons_FEtask/Backlog.svg";
import { ReactComponent as MenuIcon } from "../icons_FEtask/3 dot menu.svg";
import { ReactComponent as AddIcon } from "../icons_FEtask/add.svg";

const KanbanBoard = () => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState({});
  const [grouping, setGrouping] = useState("status");
  const [sortBy, setSortBy] = useState("priority");

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    const data = await getTicketsFromAPI();
    if (data) {
      setTickets(data.tickets);

      const userLookup = data.users.reduce((acc, user) => {
        acc[user.id] = user.name;
        return acc;
      }, {});

      setUsers(userLookup);
    }
  };

  const groupTickets = () => {
    switch (grouping) {
      case "status":
        return tickets.reduce((acc, ticket) => {
          (acc[ticket.status] = acc[ticket.status] || []).push(ticket);
          return acc;
        }, {});
      case "user":
        return tickets.reduce((acc, ticket) => {
          const userName = users[ticket.userId] || "Unknown User";
          (acc[userName] = acc[userName] || []).push(ticket);
          return acc;
        }, {});
      case "priority":
        return tickets.reduce((acc, ticket) => {
          const priorityName = getPriorityName(ticket.priority);
          (acc[priorityName] = acc[priorityName] || []).push(ticket);
          return acc;
        }, {});
      default:
        return {};
    }
  };

  const sortTickets = (tickets) => {
    return tickets.sort((a, b) => {
      if (sortBy === "priority") {
        return b.priority - a.priority;
      } else if (sortBy === "title") {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });
  };

  const getPriorityName = (priority) => {
    switch (priority) {
      case 4:
        return "Urgent";
      case 3:
        return "High";
      case 2:
        return "Medium";
      case 1:
        return "Low";
      default:
        return "No priority";
    }
  };

  const getColumnIcon = (group) => {
    switch (grouping) {
      case "priority":
        const priorityIconMap = {
          Urgent: <UrgentIcon />,
          High: <HighIcon />,
          Medium: <MediumIcon />,
          Low: <LowIcon />,
          "No priority": <NoPriorityIcon />,
        };
        return priorityIconMap[group] || null;
      case "status":
        const statusIconMap = {
          Todo: <TodoIcon />,
          "In progress": <InProgressIcon />,
          Backlog: <BacklogIcon />,
        };
        return statusIconMap[group] || null;
      case "user":
        const userIconMap = {
          "Unknown User": <NoPriorityIcon />, // Replace with default or specific icon
        };
        return userIconMap[group] || null;
      default:
        return null;
    }
  };

  const groupedTickets = groupTickets();

  return (
    <div className="kanban-board">
      <CustomDropdown
        onGroupingChange={setGrouping}
        onSortingChange={setSortBy}
      />

      <div className="columns">
        {Object.keys(groupedTickets).map((group) => (
          <div key={group} className="kanban-column">
            <div className="column-header">
              <h2>
                {getColumnIcon(group)} {/* Display icon */}
                <span className="column-heading" >{group}</span> <span className="column-count" >{groupedTickets[group].length}</span> {/* Count of cards */}
              </h2>
              <div className="header-buttons">
                <AddIcon className="header-icon" />
                <MenuIcon className="header-icon" />
              </div>
            </div>
            {sortTickets(groupedTickets[group]).map((ticket) => (
              <TicketCard
                key={ticket.id}
                ticket={ticket}
                userName={users[ticket.userId]}
                grouping={grouping}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;
