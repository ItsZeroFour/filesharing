import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { AiOutlineCloudDownload } from "react-icons/ai";
import { Link } from "react-router-dom";
import { db } from "../../firebase/firebase-config";

const GetFile = () => {
  const [inputValue, setInputValue] = useState("");
  const [data, setData] = useState([]);
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(true);

  // ==== Firebase ====
  const downloadDataCollectionRef = collection(db, "downloadUrls");

  useEffect(() => {
    const getDownloadData = async () => {
      const getData = await getDocs(downloadDataCollectionRef);
      setData(getData);
      setLoading(false);
    };

    getDownloadData();
  }, []);

  useEffect(() => {
    let inputValueVar = inputValue;

    data.length !== 0 &&
      data !== undefined &&
      setUrl(
        data.docs.find(
          (key) =>
            key._document?.data?.value?.mapValue?.fields?.key?.stringValue ===
            inputValueVar
        )
      );
  }, [inputValue]);

  // ==== Firebase/ ====

  console.log(url);

  return (
    <div className="getfile">
      <div className="container">
        {!loading ? (
          <div className="getfile__container">
            <div className="getfile__content">
              <form className="getfile__content-form">
                <input
                  className="getfile__content-input"
                  type="text"
                  placeholder="Insert Download ID"
                  onChange={(event) => setInputValue(event.target.value)}
                />
              </form>

              {url !== undefined && url !== "" ? (
                <div className="download__container">
                  <p>
                    {window.screen.width > 296 && "File Name: "}

                    {url !== undefined &&
                      url !== "" &&
                      url._document.data.value.mapValue.fields.fileName
                        .stringValue}
                  </p>

                  <a
                    className="getfile__content-button"
                    href={
                      url !== undefined &&
                      url !== "" &&
                      url._document.data.value.mapValue.fields.url.stringValue
                    }
                    download={
                      url !== undefined &&
                      url !== "" &&
                      url._document.data.value.mapValue.fields.url.stringValue
                    }
                  >
                    Download File
                  </a>
                </div>
              ) : (
                <p className="notfound-file">File Not Found😢</p>
              )}

              <Link className="sentfile__link" to="/filesharing">
                Sent File
              </Link>
            </div>
          </div>
        ) : (
          <div className="loader">
            <div className="lds-ring">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GetFile;
