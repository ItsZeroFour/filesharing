import React, { useRef, useState } from "react";
import { BiPlus } from "react-icons/bi";
import { AiFillCopy } from "react-icons/ai";
import { Link } from "react-router-dom";
import { lowerCaseLetter, upperCaseLetter, figures } from "../../data";
import { db } from "../../firebase/firebase-config";
import { collection, addDoc } from "firebase/firestore";

const FileSharing = () => {
  const [image, setImage] = useState({});
  const [imageUrl, setImageUrl] = useState("");
  const [fileName, setFileName] = useState("");
  const [maxFileSize, setMaxFileSize] = useState(false);
  const [randomKey, setRandomKey] = useState("");
  const fileComponent = useRef();

  // File reader
  const fileReader = new FileReader();
  fileReader.onloadend = () => {
    setImageUrl(fileReader.result);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const file = event.target.files[0];

    // If file size is larger than max file size
    if (file.size < 1048487) {
      setImage(file);
      setFileName(file.name);
      fileReader.readAsDataURL(file);
      setMaxFileSize(false);
    } else {
      setMaxFileSize(true);
    }
  };

  const downloadDataCollectionRef = collection(db, "downloadUrls");

  const createDownloadData = async (event) => {
    event.preventDefault();

    let randomKey;

    // Generate random key
    for (let i = 0; i < 10; i++) {
      const randomLowerCaseLetter = Math.floor(
        Math.random() * lowerCaseLetter.length
      );
      const randomUpperCaseLetter = Math.floor(
        Math.random() * upperCaseLetter.length
      );
      const randomFigures = Math.floor(Math.random() * figures.length);
      randomKey += String(lowerCaseLetter[randomLowerCaseLetter]);
      randomKey += String(upperCaseLetter[randomUpperCaseLetter]);
      randomKey += String(figures[randomFigures]);
      randomKey = randomKey
        .split("")
        .sort(function () {
          return 0.5 - Math.random();
        })
        .join("");

      setRandomKey(randomKey);
    }

    await addDoc(downloadDataCollectionRef, {
      fileName: fileName,
      url: imageUrl,
      key: randomKey,
    });
  };

  // TODO: Менять кнопку, а не показывать две, и когда файл будет загружен, поменять кнопку обратно на загрузить файл

  return (
    <div className="filesharing">
      <div className="container">
        <div className="filesharing__container">
          <div className="filesharing__content">
            <div className="filesharing__content-items">
              <div className="filesharing__content-text">
                <h1>Simlify your filing system</h1>
                <p>Select the item you want to send</p>
              </div>
              <form>
                <input
                  id="file"
                  className="filesharing__content-button"
                  type="file"
                  ref={fileComponent}
                  onChange={handleSubmit}
                />
                <label
                  className="filesharing__content-button-label"
                  htmlFor="file"
                >
                  <BiPlus /> <p>Choose File</p>
                </label>
              </form>

              {image.name && (
                <div>
                  <button
                    className="filesharing__content-upload"
                    onClick={createDownloadData}
                  >
                    Upload File
                  </button>

                  <div className="fileshading__key">
                    {window.screen.width > 474 && (
                      <p className="key">Your Key: {randomKey}</p>
                    )}

                    <p
                      className="copy-button"
                      onClick={() => navigator.clipboard.writeText(randomKey)}
                    >
                      Copy Key <AiFillCopy className="copy-icon" />
                    </p>
                  </div>
                </div>
              )}

              {!maxFileSize ? (
                <div className="filesharing__fileinfo">
                  <p className="filesharing__filename">{image && image.name}</p>
                </div>
              ) : (
                <div>
                  <p className="color-danger" style={{ marginTop: "1rem" }}>
                    Maximum file size limit! Maximum: 1Mb
                  </p>
                </div>
              )}
            </div>

            <Link className="filesharing__getfile-button" to="getfile">
              Get file
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileSharing;
