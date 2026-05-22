"use client";

import { useState, useEffect } from "react";
import { Save, Check } from "lucide-react";
import { SiteSettings } from "@/lib/types";
import { getSettings, saveSettings } from "@/lib/data";

export default function SettingsPanel() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [saved, setSaved] = useState(false);
  const [newAchievement, setNewAchievement] = useState("");

  useEffect(() => {
    setSettings(getSettings());
  }, []);

  const handleSave = () => {
    if (!settings) return;
    saveSettings(settings);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const addAchievement = () => {
    if (!newAchievement.trim() || !settings) return;
    setSettings({
      ...settings,
      achievements: [...settings.achievements, newAchievement.trim()],
    });
    setNewAchievement("");
  };

  const removeAchievement = (index: number) => {
    if (!settings) return;
    setSettings({
      ...settings,
      achievements: settings.achievements.filter((_, i) => i !== index),
    });
  };

  if (!settings) return null;

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg text-primary font-medium">Site Settings</h3>
          <p className="text-xs text-muted mt-1">
            Update your artist profile, contact info, and social links.
          </p>
        </div>
        <button
          onClick={handleSave}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs uppercase tracking-wider font-medium transition-all ${
            saved
              ? "bg-success text-white"
              : "bg-gold text-midnight hover:bg-gold-dark"
          }`}
        >
          {saved ? <Check size={14} /> : <Save size={14} />}
          {saved ? "Saved!" : "Save Changes"}
        </button>
      </div>

      {/* Artist Profile */}
      <div className="surface-primary border border-subtle rounded p-4 sm:p-6 space-y-4">
        <h4 className="text-sm text-primary font-medium uppercase tracking-wider border-b border-subtle pb-3">
          Artist Profile
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs uppercase tracking-wider text-muted mb-2 block">
              Display Name
            </label>
            <input
              type="text"
              value={settings.artistName}
              onChange={(e) =>
                setSettings({ ...settings, artistName: e.target.value })
              }
              className="input-field"
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-wider text-muted mb-2 block">
              Full Name
            </label>
            <input
              type="text"
              value={settings.artistFullName}
              onChange={(e) =>
                setSettings({ ...settings, artistFullName: e.target.value })
              }
              className="input-field"
            />
          </div>
        </div>

        <div>
          <label className="text-xs uppercase tracking-wider text-muted mb-2 block">
            Title / Tagline
          </label>
          <input
            type="text"
            value={settings.artistTitle}
            onChange={(e) =>
              setSettings({ ...settings, artistTitle: e.target.value })
            }
            className="input-field"
          />
        </div>

        <div>
          <label className="text-xs uppercase tracking-wider text-muted mb-2 block">
            Bio
          </label>
          <textarea
            value={settings.bio}
            onChange={(e) =>
              setSettings({ ...settings, bio: e.target.value })
            }
            className="input-field"
            rows={5}
          />
        </div>

        <div>
          <label className="text-xs uppercase tracking-wider text-muted mb-2 block">
            Artistic Philosophy
          </label>
          <textarea
            value={settings.philosophy}
            onChange={(e) =>
              setSettings({ ...settings, philosophy: e.target.value })
            }
            className="input-field"
            rows={5}
          />
        </div>
      </div>

      {/* Contact Info */}
      <div className="surface-primary border border-subtle rounded p-4 sm:p-6 space-y-4">
        <h4 className="text-sm text-primary font-medium uppercase tracking-wider border-b border-subtle pb-3">
          Contact Information
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs uppercase tracking-wider text-muted mb-2 block">
              Email
            </label>
            <input
              type="email"
              value={settings.email}
              onChange={(e) =>
                setSettings({ ...settings, email: e.target.value })
              }
              className="input-field"
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-wider text-muted mb-2 block">
              Phone
            </label>
            <input
              type="text"
              value={settings.phone}
              onChange={(e) =>
                setSettings({ ...settings, phone: e.target.value })
              }
              className="input-field"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs uppercase tracking-wider text-muted mb-2 block">
              WhatsApp Link
            </label>
            <input
              type="text"
              value={settings.whatsapp}
              onChange={(e) =>
                setSettings({ ...settings, whatsapp: e.target.value })
              }
              className="input-field"
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-wider text-muted mb-2 block">
              Instagram Link
            </label>
            <input
              type="text"
              value={settings.instagram}
              onChange={(e) =>
                setSettings({ ...settings, instagram: e.target.value })
              }
              className="input-field"
            />
          </div>
        </div>

        <div>
          <label className="text-xs uppercase tracking-wider text-muted mb-2 block">
            Studio Address
          </label>
          <textarea
            value={settings.studioAddress}
            onChange={(e) =>
              setSettings({ ...settings, studioAddress: e.target.value })
            }
            className="input-field"
            rows={2}
          />
        </div>

        <div>
          <label className="text-xs uppercase tracking-wider text-muted mb-2 block">
            Studio Hours
          </label>
          <input
            type="text"
            value={settings.studioHours}
            onChange={(e) =>
              setSettings({ ...settings, studioHours: e.target.value })
            }
            className="input-field"
          />
        </div>
      </div>

      {/* Achievements */}
      <div className="surface-primary border border-subtle rounded p-4 sm:p-6 space-y-4">
        <h4 className="text-sm text-primary font-medium uppercase tracking-wider border-b border-subtle pb-3">
          Achievements & Exhibitions
        </h4>

        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={newAchievement}
            onChange={(e) => setNewAchievement(e.target.value)}
            placeholder="Add new achievement..."
            className="input-field flex-1"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addAchievement();
              }
            }}
          />
          <button
            type="button"
            onClick={addAchievement}
            className="btn-gold text-xs shrink-0"
          >
            Add
          </button>
        </div>

        {settings.achievements.length > 0 && (
          <div className="space-y-2">
            {settings.achievements.map((achievement, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-3 surface-secondary rounded group"
              >
                <p className="flex-1 text-sm text-secondary">{achievement}</p>
                <button
                  onClick={() => removeAchievement(i)}
                  className="text-muted hover:text-error transition-colors shrink-0 opacity-0 group-hover:opacity-100 p-1"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Save Button (Bottom) */}
      <div className="sticky bottom-4 z-10">
        <button
          onClick={handleSave}
          className={`w-full flex items-center justify-center gap-2 py-3.5 text-xs uppercase tracking-wider font-medium transition-all shadow-elevated ${
            saved
              ? "bg-success text-white"
              : "bg-gold text-midnight hover:bg-gold-dark"
          }`}
        >
          {saved ? <Check size={14} /> : <Save size={14} />}
          {saved ? "Changes Saved!" : "Save All Changes"}
        </button>
      </div>
    </div>
  );
}
