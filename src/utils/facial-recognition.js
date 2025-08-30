  import {
  FaceLandmarker,
  DrawingUtils,
  FilesetResolver,
} from "@mediapipe/tasks-vision";


//   const [faceLandMarker, setFaceLandMarker] = useState(null);
//   const [results, setResults] = useState(null);
//   const [isModelLoaded, setIsModelLoaded] = useState(false);
  
  // Facial Detection
  const createFaceLandmarker = async () => {
    try {
      const filesetResolver = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/wasm"
      );
      const landMarker = await FaceLandmarker.createFromOptions(
        filesetResolver,
        {
          baseOptions: {
            modelAssetPath: `https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task`,
            delegate: "GPU",
          },
          outputFaceBlendshapes: true,
          runningMode: "VIDEO",
          numFaces: 1,
        }
      );

      setFaceLandMarker(landMarker);
      setIsModelLoaded(true);
    } catch (error) {
      console.error("Error loading face detection model:", error);
    }
  };

  const detectFacialProperties = async () => {
    if (!faceLandMarker || !webcamRef.current) return;

    const video = webcamRef.current.video;
    if (!video || video.readyState < 2 || video.videoWidth === 0) return;

    try {
      const startTimeMs = performance.now();
      const detectionResults = faceLandMarker.detectForVideo(
        video,
        startTimeMs
      );

      if (detectionResults?.faceBlendshapes?.length > 0) {
        const blendshapes = detectionResults.faceBlendshapes[0].categories;

        // Convert to map for easy access
        const shapeMap = {};
        blendshapes.forEach((b) => (shapeMap[b.categoryName] = b.score));

        // --- Cheat detection rules ---
        let cheatingFlags = [];

        // 1. Check if eyes are closed too long
        if (shapeMap["eyeBlinkLeft"] > 0.6 && shapeMap["eyeBlinkRight"] > 0.6) {
          cheatingFlags.push("Eyes closed");
        }

        // 2. Looking away (left/right/up/down)
        if (
          shapeMap["eyeLookOutLeft"] > 0.5 ||
          shapeMap["eyeLookOutRight"] > 0.5 ||
          shapeMap["eyeLookUpLeft"] > 0.5 ||
          shapeMap["eyeLookUpRight"] > 0.5 ||
          shapeMap["eyeLookDownLeft"] > 0.5 ||
          shapeMap["eyeLookDownRight"] > 0.5
        ) {
          cheatingFlags.push("Looking away");
        }

        if (cheatingFlags.length > 0) {
          console.warn("⚠️ Possible Cheating Detected:", cheatingFlags);
        } else {
          console.log("✅ Normal Eye Behavior");
        }

        setResults({ blendshapes: shapeMap, cheating: cheatingFlags });
      }
    } catch (err) {
      console.error("Face detection error:", err);
    }
  };

  useEffect(() => {
    createFaceLandmarker();
  }, [activeQuestion]);

  // Start iris detection when model is loaded
  useEffect(() => {
    if (isModelLoaded && faceLandMarker && webcamRef.current) {
      const intervalId = setInterval(() => {
        detectFacialProperties();
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [isModelLoaded, faceLandMarker]);