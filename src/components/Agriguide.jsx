import { useEffect, useState } from "react";
import { FaSeedling } from "react-icons/fa";
import { GoArrowUp } from "react-icons/go";
import useAuth from "../hooks/useAuth";

import Markdown from "react-markdown";
import { toast } from "sonner";
import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from "react-accessible-accordion";

import "react-accessible-accordion/dist/fancy-example.css";
import { MdDeleteForever } from "react-icons/md";
const Agriguide = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [text, setText] = useState("");
  const [loadingAnswer, setLoadingAnswer] = useState(false);
  const [saved, setSaved] = useState([]);
  const [loadingSaved, setLoadingSaved] = useState(true);
  const [reloadSaved, setReloadSaved] = useState(false);

  const { user } = useAuth();

  const handleChange = (e) => {
    setText(e.target.value);
    // Resize textarea
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + "px";
  };

  const handleTextareaKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmitPrompt(e);
    }
  };

  const handleSubmitPrompt = (e) => {
    e.preventDefault();
    setAnswer("test");
    const requestBody = {
      message: `If the question is related to farming, then answer otherwise do not answer. The question is  "${text}".`,
    };

    setLoadingAnswer(true);

    fetch("http://localhost:5000/bard_ai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.text();
      })
      .then((data) => {
        setAnswer(data.split("Response:")[0]);
        setQuestion(text);
        setLoadingAnswer(false);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleAskNewQuestion = () => {
    setAnswer("");
    setQuestion("");
    setText("");
  };

  const handleSaveAnswer = () => {
    const data = {
      email: user.email,
      question: question.toUpperCase(),
      answer: answer,
    };
    fetch("http://localhost:5000/saved", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(() => {
      toast.success("Saved Successfully");
      handleAskNewQuestion();
      setReloadSaved(true);
    });
  };

  const handleDeleteSaved = (id) => {
    setReloadSaved(true);
    fetch(`http://localhost:5000/saved/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          toast.error("Deleted Successfully");
        }
      });
  };

  useEffect(() => {
    setLoadingSaved(true);
    fetch(`http://localhost:5000/saved/${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setSaved(data);
        setLoadingSaved(false);
        setReloadSaved(false);
      });
  }, [reloadSaved, user]);

  return (
    <div className="grid grid-cols-2 gap-4">
      {/* CHATBOX */}
      <div className="border rounded-2xl p-4 space-y-5 h-fit">
        {/* AI PROMPT */}
        <div className="flex gap-2">
          <div className="p-4 border rounded-full w-fit h-fit">
            <FaSeedling className="text-2xl text-primary"></FaSeedling>
          </div>
          <div className="flex-1 bg-gray-100 rounded-tr-2xl rounded-bl-2xl rounded-br-2xl p-4 text-gray-600 font-medium">
            {`Got a question about crop cultivation, pest management, soil health,
            or anything else related to farming? Don't hesitate to ask!`}
          </div>
        </div>
        {/* USER PROMPT */}
        <div className="flex gap-2">
          <form
            onSubmit={handleSubmitPrompt}
            className={`flex-1 border rounded-tl-2xl rounded-bl-2xl rounded-br-2xl p-4 text-gray-600 font-medium flex gap-4 relative ${
              answer ? "bg-gray-100" : ""
            }`}
          >
            <textarea
              name="userprompt"
              type="field"
              className="textarea-auto flex-1 outline-none pr-12 disabled:bg-transparent"
              onChange={handleChange}
              value={text}
              placeholder="Type your question here..."
              disabled={answer}
              onKeyPress={handleTextareaKeyPress}
            />
            {text ? (
              <>
                <button
                  className={`btn btn-circle border-none bg-secondary hover:bg-secondary hover:scale-[1.05] duration-300 absolute bottom-2 right-2 ${
                    answer ? "hidden" : ""
                  }`}
                >
                  <GoArrowUp className="text-2xl text-white" />
                </button>
              </>
            ) : (
              <></>
            )}
          </form>
          <div className="rounded-full">
            <img src={user?.photoURL} className="w-12 rounded-full" />
          </div>
        </div>
        {/* AI ANSWER */}
        {loadingAnswer ? (
          <>
            <div className="flex gap-2  animate-pulse">
              <div className="p-4 border rounded-full w-fit h-fit">
                <FaSeedling className="text-2xl text-primary"></FaSeedling>
              </div>
              <div className="flex-1 bg-gray-200 rounded-tr-2xl rounded-bl-2xl rounded-br-2xl p-4 text-gray-600 font-medium"></div>
            </div>
          </>
        ) : (
          <>
            {question !== "" && answer !== "" ? (
              <>
                <div className="flex gap-2">
                  <div className="p-4 border rounded-full w-fit h-fit">
                    <FaSeedling className="text-2xl text-primary"></FaSeedling>
                  </div>
                  <div className="flex-1 bg-gray-100 rounded-tr-2xl rounded-bl-2xl rounded-br-2xl p-4 text-gray-600 font-medium relative">
                    <Markdown>{answer}</Markdown>
                    <div className="absolute -bottom-4 -right-2 flex gap-1">
                      <button
                        className="btn-sm btn bg-red-600 hover:bg-red-600 text-white  flex"
                        onClick={() => handleAskNewQuestion()}
                      >
                        Ask Another Question?
                      </button>
                      <button
                        className="btn-sm btn bg-green-600 hover:bg-green-600 text-white flex"
                        onClick={() => handleSaveAnswer()}
                      >
                        Save Answer
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <></>
            )}
          </>
        )}
      </div>
      {/* SAVED */}
      <div className="border rounded-2xl p-4 min-h-[650px] overflow-hidden">
        <h1 className="font-bold bg-primary text-white p-1 text-center rounded-t-lg mb-2 text-lg">
          Saved Answers
        </h1>

        {loadingSaved ? (
          <>
            <div className="flex items-center justify-center h-full">
              <span className="loading loading-bars loading-xl text-black"></span>
            </div>
          </>
        ) : (
          <>
            {saved.length > 0 ? (
              <>
                <Accordion allowZeroExpanded>
                  {saved.map((item) => (
                    <AccordionItem key={item._id}>
                      <AccordionItemHeading>
                        <AccordionItemButton
                          style={{
                            backgroundColor: "white",
                            position: "relative",
                          }}
                        >
                          {item.question}
                          <div className="absolute right-2 top-0 bottom-0 justify-center flex items-center z-50">
                            <button
                              className=" bg-red-500 text-white hover:bg-red-600 btn btn-sm"
                              onClick={() => handleDeleteSaved(item._id)}
                            >
                              <MdDeleteForever className="text-xl"></MdDeleteForever>
                            </button>
                          </div>
                        </AccordionItemButton>
                      </AccordionItemHeading>
                      <AccordionItemPanel>
                        <Markdown>{item.answer}</Markdown>
                      </AccordionItemPanel>
                    </AccordionItem>
                  ))}
                </Accordion>
              </>
            ) : (
              <>
                <div className="flex justify-center items-center h-full text-secondary font-bold">
                  No Answers Saved Yet!
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Agriguide;
