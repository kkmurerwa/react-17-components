import { useContext } from "react";
import Speaker from "./Speaker";
import useRequestRest, { REQUEST_STATUS } from "../hooks/useRequestRest";
import { data } from "../../SpeakerData";
import { SpeakerFilterContext } from "../contexts/SpeakerFilterContext";
import SpeakerAdd from "./SpeakerAdd";

function SpeakersList() {
  const {
    data: speakersData,
    requestStatus,
    error,
    updateRecord,
    insertRecord,
    deleteRecord,
  } = useRequestRest();

  const { searchQuery, eventYear } = useContext(SpeakerFilterContext);

  if (requestStatus === REQUEST_STATUS.FAILURE) {
    return (
      <div className="text-danger">
        ERROR: <b>loading Speaker Data Failed {error}</b>
      </div>
    );
  }

  if (requestStatus === REQUEST_STATUS.LOADING) return <div>Loading...</div>;

  return (
    <div className="container speakers-list">
      <SpeakerAdd eventYear={eventYear} insertRecord={insertRecord} />
      <div className="row">
        {speakersData
          .filter(function (speaker) {
            return (
              speaker.first.toLowerCase().includes(searchQuery) ||
              speaker.last.toLowerCase().includes(searchQuery)
            );
          })
          .filter(function (speaker) {
            return speaker.sessions.find((session) => {
              return session.eventYear === eventYear;
            });
          })
          .map(function (speaker) {
            return (
              <Speaker
                key={speaker.id}
                speaker={speaker}
                updateRecord={updateRecord}
                insertRecord={insertRecord}
                deleteRecord={deleteRecord}
              />
            );
          })}
      </div>
    </div>
  );
}

export default SpeakersList;
