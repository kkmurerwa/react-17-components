import Speaker from "./Speaker";
import useRequestDelay, { REQUEST_STATUS } from "../hooks/useRequestDelay";
import { data } from "../../SpeakerData";
import { useContext } from "react";
import { SpeakerFilterContext } from "../contexts/SpeakerFilterContext";

function SpeakersList() {
  const {
    data: speakersData,
    requestStatus,
    error,
    updateRecord,
  } = useRequestDelay(2000, data);

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
      <div className="row">
        {speakersData
          .filter((speaker) => {
            return (
              speaker.first.toLowerCase().includes(searchQuery) ||
              speaker.last.toLowerCase().includes(searchQuery)
            );
          })
          .filter((speaker) => {
            return speaker.sessions.find((session) => {
              return session.eventYear === eventYear;
            });
          })
          .map(function (speaker) {
            return (
              <Speaker
                key={speaker.id}
                speaker={speaker}
                onFavoriteToggle={(doneCallback) => {
                  updateRecord(
                    {
                      ...speaker,
                      favorite: !speaker.favorite,
                    },
                    doneCallback
                  );
                }}
              />
            );
          })}
      </div>
    </div>
  );
}

export default SpeakersList;
