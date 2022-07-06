import axios from "axios";
import { useEffect, useState } from "react";
import "./conversation.css";

export default function Conversation({ conversation, currentUser,convSearch }) {
  const [user, setUser] = useState(null); // user cục bộ 
  // ở dưới để dấu chấm hỏi để có thể có hoặc không có trường đối với 1 object => chống null lúc đầu
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
   
  // lấy thông tin thằng user còn lại trong đoạn chat 
  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);

    const getUser = async () => {
      try {
        const res = await axios("/users?userId=" + friendId);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]);
  // lấy xong thông tin về thằng conf lại thì tiến hành hiển thị 
  return (
    <div className="conversation">
      {/*Đường link ảnh truy cập lên server*/}
      {/*set chuyển màu*/}
      {
        (user?.username.includes(convSearch))?(
          <div>
            <img
              className="conversationImg"
              src={
                user?.profilePicture
                  ? PF + user.profilePicture
                  : PF + "person/noAvatar.png"
              }
              alt=""
            />
            <span style={(conversation.status)?{color:'red'}:{}} className="conversationName">{user?.username}</span>
          </div>
        ):(
          <span></span>
        )
      }
      </div>
  );
}