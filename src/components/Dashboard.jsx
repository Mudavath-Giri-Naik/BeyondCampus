import { useState, useEffect } from "react";
import { FaLinkedin, FaGithub, FaCode } from "react-icons/fa";
import { auth, db, storage } from "../config/firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const DEFAULT_PROFILE_PIC = "https://www.w3schools.com/howto/img_avatar.png";

export default function Dashboard() {
  const [profile, setProfile] = useState({
    profilePic: DEFAULT_PROFILE_PIC,
    name: "", // Added Name field
    profession: "",
    location: "",
    linkedin: "",
    github: "",
    leetcode: "",
    skills: [],
  });
  const [tempSkill, setTempSkill] = useState("");
  const [showProfile, setShowProfile] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const [editing, setEditing] = useState(false);
  const user = auth.currentUser;

  useEffect(() => {
    if (user) {
      fetchProfileData();
    }
  }, [user]);

  const fetchProfileData = async () => {
    try {
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        setProfile({ ...DEFAULT_PROFILE_PIC, ...userDoc.data() });
        setShowProfile(true);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageUploading(true);
      const storageRef = ref(storage, `profile_pictures/${user.uid}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      setProfile({ ...profile, profilePic: downloadURL });
      setImageUploading(false);
    }
  };

  const handleAddSkill = () => {
    if (tempSkill.trim()) {
      setProfile({ ...profile, skills: [...profile.skills, tempSkill] });
      setTempSkill("");
    }
  };

  const handleSave = async () => {
    try {
      await setDoc(doc(db, "users", user.uid), profile);
      setShowProfile(true);
      setEditing(false);
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      window.location.href = "/login";
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      {!showProfile || editing ? (
        <div className="max-w-lg mx-auto bg-white p-6 shadow-lg rounded-lg">
          <h2 className="text-xl font-bold mb-4">{editing ? "Edit Your Profile" : "Fill Your Profile"}</h2>

          {/* Name Field */}
          <div className="mb-3">
            <label className="block font-semibold">Name</label>
            <input type="text" name="name" value={profile.name} onChange={handleInputChange} className="border p-2 w-full" />
          </div>

          <div className="mb-3">
            <label className="block font-semibold">Profile Picture</label>
            <input type="file" accept="image/*" onChange={handleImageUpload} className="border p-2 w-full" />
            {imageUploading && <p className="text-sm text-gray-500">Uploading...</p>}
            <img src={profile.profilePic || DEFAULT_PROFILE_PIC} alt="Profile" className="w-16 h-16 rounded-full mt-2" />
          </div>

          <div className="mb-3">
            <label className="block font-semibold">Profession</label>
            <input type="text" name="profession" value={profile.profession} onChange={handleInputChange} className="border p-2 w-full" />
          </div>

          <div className="mb-3">
            <label className="block font-semibold">Location</label>
            <input type="text" name="location" value={profile.location} onChange={handleInputChange} className="border p-2 w-full" />
          </div>

          <div className="mb-3">
            <label className="block font-semibold">LinkedIn</label>
            <input type="text" name="linkedin" value={profile.linkedin} onChange={handleInputChange} className="border p-2 w-full" />
          </div>

          <div className="mb-3">
            <label className="block font-semibold">GitHub</label>
            <input type="text" name="github" value={profile.github} onChange={handleInputChange} className="border p-2 w-full" />
          </div>

          <div className="mb-3">
            <label className="block font-semibold">LeetCode</label>
            <input type="text" name="leetcode" value={profile.leetcode} onChange={handleInputChange} className="border p-2 w-full" />
          </div>

          <div className="mb-3">
            <label className="block font-semibold">Skills</label>
            <div className="flex gap-2">
              <input type="text" value={tempSkill} onChange={(e) => setTempSkill(e.target.value)} className="border p-2 flex-grow" />
              <button onClick={handleAddSkill} className="bg-blue-500 text-white px-4 py-2 rounded">Add</button>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {profile.skills.map((skill, index) => (
                <span key={index} className="bg-blue-500 text-white px-2 py-1 rounded-lg">{skill}</span>
              ))}
            </div>
          </div>

          <button onClick={handleSave} className="w-full bg-green-500 text-white p-2 rounded mt-4">Save Profile</button>
        </div>
      ) : (
        <div className="max-w-lg mx-auto bg-white p-6 shadow-lg rounded-lg">
          <img src={profile.profilePic || DEFAULT_PROFILE_PIC} alt="Profile" className="w-32 h-32 object-cover rounded-lg mx-auto" />
          <h2 className="text-xl font-bold text-center mt-4">{profile.name}</h2> {/* Display Name */}
          <p className="text-center text-gray-600">{profile.profession}</p>
          <p className="text-center text-gray-600">{profile.location}</p>
          <div className="flex justify-center gap-4 mt-4">
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer"><FaLinkedin className="text-blue-600 text-2xl" /></a>
            <a href={profile.github} target="_blank" rel="noopener noreferrer"><FaGithub className="text-black text-2xl" /></a>
            <a href={profile.leetcode} target="_blank" rel="noopener noreferrer"><FaCode className="text-orange-500 text-2xl" /></a>
          </div>
          <button onClick={() => setEditing(true)} className="w-full bg-yellow-500 text-white p-2 rounded mt-2">Edit Profile</button>
          <button onClick={handleLogout} className="w-full bg-red-500 text-white p-2 rounded mt-2">Log Out</button>
        </div>
      )}
    </div>
  );
}
