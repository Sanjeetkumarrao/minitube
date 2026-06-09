import { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import {
  updateAccountDetails,
  updateAvatar,
  updateCoverImage,
  changePassword,
} from "../services/auth.service.js";
import toast from "react-hot-toast";

const Settings = () => {
  const { user, fetchCurrentUser } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");

  const [profileForm, setProfileForm] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
  });
  const [passwordForm, setPasswordForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [saving, setSaving] = useState(false);

  const handleProfileSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateAccountDetails(profileForm);
      await fetchCurrentUser();
      toast.success("Profile updated!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordSave = async (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      return toast.error("Passwords don't match");
    }
    setSaving(true);
    try {
      await changePassword({
        oldPassword: passwordForm.oldPassword,
        newPassword: passwordForm.newPassword,
      });
      toast.success("Password changed!");
      setPasswordForm({ oldPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed");
    } finally {
      setSaving(false);
    }
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("avatar", file);
    try {
      await updateAvatar(formData);
      await fetchCurrentUser();
      toast.success("Avatar updated!");
    } catch {
      toast.error("Failed to update avatar");
    }
  };

  const handleCoverChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("coverImage", file);
    try {
      await updateCoverImage(formData);
      await fetchCurrentUser();
      toast.success("Cover image updated!");
    } catch {
      toast.error("Failed to update cover image");
    }
  };

  const tabs = ["profile", "password", "images"];

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>

      {/* Tabs */}
      <div className="flex gap-1 bg-dark-card rounded-xl p-1 mb-6 w-fit">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            className={`px-5 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
              activeTab === t ? "bg-dark-border text-dark-text" : "text-dark-muted hover:text-dark-text"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Profile Tab */}
      {activeTab === "profile" && (
        <form onSubmit={handleProfileSave} className="bg-dark-card border border-dark-border rounded-xl p-6 space-y-4">
          <div className="flex items-center gap-4 mb-4">
            <img src={user?.avatar} alt="" className="w-16 h-16 rounded-full object-cover" />
            <div>
              <p className="font-semibold">{user?.fullName}</p>
              <p className="text-dark-muted text-sm">@{user?.username}</p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">Full Name</label>
            <input
              value={profileForm.fullName}
              onChange={(e) => setProfileForm({ ...profileForm, fullName: e.target.value })}
              className="input"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">Email</label>
            <input
              type="email"
              value={profileForm.email}
              onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
              className="input"
              required
            />
          </div>

          <button type="submit" disabled={saving} className="btn-primary">
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </form>
      )}

      {/* Password Tab */}
      {activeTab === "password" && (
        <form onSubmit={handlePasswordSave} className="bg-dark-card border border-dark-border rounded-xl p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1.5">Current Password</label>
            <input
              type="password"
              value={passwordForm.oldPassword}
              onChange={(e) => setPasswordForm({ ...passwordForm, oldPassword: e.target.value })}
              className="input"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">New Password</label>
            <input
              type="password"
              value={passwordForm.newPassword}
              onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
              className="input"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Confirm New Password</label>
            <input
              type="password"
              value={passwordForm.confirmPassword}
              onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
              className="input"
              required
            />
          </div>
          <button type="submit" disabled={saving} className="btn-primary">
            {saving ? "Changing..." : "Change Password"}
          </button>
        </form>
      )}

      {/* Images Tab */}
      {activeTab === "images" && (
        <div className="bg-dark-card border border-dark-border rounded-xl p-6 space-y-6">
          {/* Avatar */}
          <div>
            <h3 className="font-semibold mb-3">Profile Picture</h3>
            <div className="flex items-center gap-4">
              <img src={user?.avatar} alt="" className="w-20 h-20 rounded-full object-cover border-2 border-dark-border" />
              <label className="btn-secondary cursor-pointer text-sm">
                Change Avatar
                <input type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
              </label>
            </div>
          </div>

          {/* Cover Image */}
          <div>
            <h3 className="font-semibold mb-3">Cover Image</h3>
            <div className="w-full h-32 rounded-xl overflow-hidden bg-dark-border mb-3">
              {user?.coverImage ? (
                <img src={user.coverImage} alt="cover" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gradient-to-r from-dark-card to-dark-border" />
              )}
            </div>
            <label className="btn-secondary cursor-pointer text-sm">
              Change Cover Image
              <input type="file" accept="image/*" className="hidden" onChange={handleCoverChange} />
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
