import React, { useState, useRef, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import the styles
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import SignaturePad from "signature_pad";

const SingleRedMother = () => {
  const [editorContent, setEditorContent] = useState("");
  const signaturePadRef = useRef<HTMLCanvasElement>(null);
  const padInstance = useRef<SignaturePad | null>(null);
  const [signature, setSignature] = useState<string | null>(null);

  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const handleEditorChange = (content: string) => {
    setEditorContent(content);
  };

  const saveContent = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3000/users/mother/${id}/rich-text-content`,
        {
          richTextContent: editorContent,
        }
        // {
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //   },
        // }
      );
      console.log("Content saved successfully:", response.data);
      navigate(`/view-content/${id}`); // Redirect to the view content page
    } catch (error) {
      console.error("Error saving content:", error);
    }
  };

  // Initialize signature pad
  useEffect(() => {
    if (signaturePadRef.current) {
      // Set canvas dimensions
      const canvas = signaturePadRef.current;
      const ratio = Math.max(window.devicePixelRatio || 1, 1);
      canvas.width = canvas.offsetWidth * ratio;
      canvas.height = canvas.offsetHeight * ratio;
      canvas.getContext("2d")?.scale(ratio, ratio);

      // Initialize SignaturePad
      padInstance.current = new SignaturePad(canvas, {
        minWidth: 0.5,
        maxWidth: 2.5,
        backgroundColor: "rgb(255, 255, 255)",
      });
    }

    // Cleanup
    return () => {
      if (padInstance.current) {
        padInstance.current.off();
      }
    };
  }, []);

  // Fetch existing signature
  useEffect(() => {
    const fetchSignature = async () => {
      const storedToken = localStorage.getItem("token");
      const token = storedToken ? JSON.parse(storedToken) : null;

      try {
        const response = await axios.get(
          `http://localhost:3000/users/mother/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.signature) {
          setSignature(response.data.vogSignature);
          if (padInstance.current) {
            padInstance.current.fromDataURL(response.data.signature);
          }
        }
      } catch (error) {
        console.error("Error fetching signature:", error);
        toast.error("Failed to load signature");
      }
    };

    fetchSignature();
  }, [id]);

  const clearSignature = () => {
    if (padInstance.current) {
      padInstance.current.clear();
      setSignature(null);
    }
  };

  const saveSignature = async () => {
    if (!padInstance.current || padInstance.current.isEmpty()) {
      toast.warning("Please provide a signature before saving");
      return;
    }

    const dataURL = padInstance.current.toDataURL("image/png");
    const storedToken = localStorage.getItem("token");
    const token = storedToken ? JSON.parse(storedToken) : null;

    try {
      await axios.put(
        `http://localhost:3000/users/mother/${id}/vogsignature`,
        {
          signature: dataURL,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSignature(dataURL);
      toast.success("Signature saved successfully");
    } catch (error) {
      console.error("Error saving signature:", error);
      toast.error("Failed to save signature");
    }
  };

  return (
    <div>
      <div className="container mx-auto p-4">
        {/* <h1 className="text-2xl font-bold mb-4">Single Red Mother</h1> */}
        <ReactQuill
          value={editorContent}
          onChange={handleEditorChange}
          modules={SingleRedMother.modules}
          formats={SingleRedMother.formats}
          placeholder="Write something..."
        />
        <button
          onClick={saveContent}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Save
        </button>
      </div>
      <div className="flex items-center justify-between h-auto mt-4 mx-4">
        <div className="mt-4">
          {signature ? (
            <div>
              {/* <h3>Saved Signature:</h3> */}
              <img
                src={signature}
                alt="Saved Signature"
                className="border border-gray-300 rounded-md"
              />
              {/* <button
                        type="button"
                        onClick={() => setSignature(null)} // Allow user to provide a new signature
                        className="px-4 py-2 bg-yellow-500 text-white rounded-md mt-2"
                      >
                        Edit Signature
                      </button> */}
            </div>
          ) : (
            <div>
              <canvas
                ref={signaturePadRef}
                className="border border-gray-300 rounded-md"
              ></canvas>
              <div className="mt-2 flex space-x-2">
                <button
                  type="button"
                  onClick={clearSignature}
                  className="px-4 py-2 bg-red-500 text-white rounded-md"
                >
                  Clear
                </button>
                <button
                  type="button"
                  onClick={saveSignature}
                  className="px-4 py-2 bg-green-500 text-white rounded-md"
                >
                  Save
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Configure the editor options
SingleRedMother.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link"],
  ],
};

SingleRedMother.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  // "image",
  // "video",
];

export default SingleRedMother;
