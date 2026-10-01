import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Award,
  Upload,
  X,
  Trash2,
  Eye,
  FileText,
  Image as ImageIcon,
  Plus,
  Calendar,
  Building2,
  Hash,
  Loader2,
  Lock,
  Eye as EyeIcon,
  EyeOff
} from 'lucide-react';
import { Card, CardContent } from '../app/components/ui/card';
import { toast } from 'sonner';
import {
  listCertifications,
  verifyAdminPassword,
  createCertification,
  deleteCertification,
} from '../lib/supabaseRest';

interface Certification {
  id: string;
  name: string;
  issuer: string;
  issue_date: string | null;
  credential_id: string | null;
  file_url: string;
  file_type: string;
  created_at: string;
}

interface UploadForm {
  name: string;
  issuer: string;
  issue_date: string;
  credential_id: string;
  file: File | null;
}

const EMPTY_FORM: UploadForm = {
  name: '',
  issuer: '',
  issue_date: '',
  credential_id: '',
  file: null,
};

export function Certifications() {
  const [certs, setCerts] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);

  // Admin unlock
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<'upload' | 'delete' | null>(null);
  const [pendingDeleteCert, setPendingDeleteCert] = useState<Certification | null>(null);
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Upload modal
  const [uploadOpen, setUploadOpen] = useState(false);
  const [form, setForm] = useState<UploadForm>(EMPTY_FORM);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // View modal
  const [viewCert, setViewCert] = useState<Certification | null>(null);

  useEffect(() => {
    fetchCerts();
  }, []);

  async function fetchCerts() {
    setLoading(true);
    try {
      setCerts(await listCertifications<Certification>());
    } catch {
      toast.error('Failed to load certifications.');
    }
    setLoading(false);
  }

  function requestAction(action: 'upload', cert?: undefined): void;
  function requestAction(action: 'delete', cert: Certification): void;
  function requestAction(action: 'upload' | 'delete', cert?: Certification) {
    if (isUnlocked) {
      if (action === 'upload') setUploadOpen(true);
      if (action === 'delete' && cert) handleDelete(cert);
      return;
    }
    setPendingAction(action);
    if (action === 'delete' && cert) setPendingDeleteCert(cert);
    setPasswordInput('');
    setPasswordError('');
    setShowPassword(false);
    setPasswordModalOpen(true);
  }

  async function handlePasswordSubmit() {
    const ok = await verifyAdminPassword(passwordInput).catch(() => false);
    if (ok) {
      setAdminPassword(passwordInput);
      setIsUnlocked(true);
      setPasswordModalOpen(false);
      setPasswordError('');
      if (pendingAction === 'upload') setUploadOpen(true);
      if (pendingAction === 'delete' && pendingDeleteCert) handleDelete(pendingDeleteCert);
      setPendingAction(null);
      setPendingDeleteCert(null);
    } else {
      setPasswordError('Incorrect password. Please try again.');
      setPasswordInput('');
    }
  }

  function handleFileSelect(file: File) {
    const allowed = ['application/pdf', 'image/jpeg', 'image/png', 'image/webp'];
    if (!allowed.includes(file.type)) {
      toast.error('Only PDF, JPG, PNG, or WEBP files are supported.');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      toast.error('File must be under 10 MB.');
      return;
    }
    setForm((f) => ({ ...f, file }));
  }

  async function handleUpload() {
    if (!form.name.trim()) { toast.error('Certificate name is required.'); return; }
    if (!form.issuer.trim()) { toast.error('Issuing organization is required.'); return; }
    if (!form.file) { toast.error('Please select a file to upload.'); return; }

    setUploading(true);
    try {
      await createCertification(
        adminPassword,
        {
          name: form.name.trim(),
          issuer: form.issuer.trim(),
          issue_date: form.issue_date,
          credential_id: form.credential_id.trim(),
        },
        form.file,
      );

      toast.success('Certification uploaded successfully.');
      setForm(EMPTY_FORM);
      setUploadOpen(false);
      fetchCerts();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Upload failed.';
      toast.error(message);
    } finally {
      setUploading(false);
    }
  }

  async function handleDelete(cert: Certification) {
    if (!confirm(`Delete "${cert.name}"? This cannot be undone.`)) return;

    try {
      await deleteCertification(adminPassword, cert.id);
      toast.success('Certification deleted.');
      setCerts((prev) => prev.filter((c) => c.id !== cert.id));
    } catch {
      toast.error('Failed to delete certification.');
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0e27] pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Certifications
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Professional certifications and credentials earned across enterprise IT,
            cloud, security, and digital transformation disciplines.
          </p>
        </motion.div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center py-24">
            <Loader2 className="h-10 w-10 text-[#d4af37] animate-spin" />
          </div>
        )}

        {/* Empty state */}
        {!loading && certs.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-24 text-center"
          >
            <Award className="h-16 w-16 text-[#d4af37]/40 mb-4" />
            <p className="text-gray-400 text-lg">No certifications uploaded yet.</p>
            <p className="text-gray-500 text-sm mt-2">
              Click the button below to add your first certification.
            </p>
          </motion.div>
        )}

        {/* Certifications Grid */}
        {!loading && certs.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {certs.map((cert, i) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Card className="bg-[#0f1629] border-[#1a1f3a] hover:border-[#d4af37]/40 transition-colors relative group">
                  <button
                    onClick={() => requestAction('delete', cert)}
                    className="absolute top-3 right-3 p-1.5 rounded-md bg-red-500/10 text-red-400 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500/20 z-10"
                    title="Delete certification"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>

                  <CardContent className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="p-3 rounded-lg bg-[#d4af37]/10 shrink-0">
                        {cert.file_type === 'pdf'
                          ? <FileText className="h-6 w-6 text-[#d4af37]" />
                          : <ImageIcon className="h-6 w-6 text-[#d4af37]" />
                        }
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-white font-semibold text-sm leading-snug line-clamp-2">
                          {cert.name}
                        </h3>
                        <div className="flex items-center gap-1.5 mt-1">
                          <Building2 className="h-3.5 w-3.5 text-[#d4af37] shrink-0" />
                          <span className="text-gray-400 text-xs truncate">{cert.issuer}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1.5 mb-5">
                      {cert.issue_date && (
                        <div className="flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5 text-gray-500 shrink-0" />
                          <span className="text-gray-400 text-xs">{cert.issue_date}</span>
                        </div>
                      )}
                      {cert.credential_id && (
                        <div className="flex items-center gap-1.5">
                          <Hash className="h-3.5 w-3.5 text-gray-500 shrink-0" />
                          <span className="text-gray-400 text-xs font-mono truncate">{cert.credential_id}</span>
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => setViewCert(cert)}
                      className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-md bg-[#d4af37]/10 text-[#d4af37] text-sm font-medium hover:bg-[#d4af37]/20 transition-colors"
                    >
                      <Eye className="h-4 w-4" />
                      View Certificate
                    </button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Upload FAB — always visible */}
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => requestAction('upload')}
          className="fixed bottom-8 right-8 flex items-center gap-2 px-5 py-3 rounded-full bg-[#d4af37] text-[#0a0e27] font-semibold shadow-lg shadow-[#d4af37]/20 hover:bg-[#e4c447] transition-colors z-40"
        >
          <Plus className="h-5 w-5" />
          Upload Certification
        </motion.button>
      </div>

      {/* ── Password Modal ── */}
      <AnimatePresence>
        {passwordModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={(e) => { if (e.target === e.currentTarget) { setPasswordModalOpen(false); setPendingAction(null); setPendingDeleteCert(null); } }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              className="bg-[#0f1629] border border-[#1a1f3a] rounded-xl w-full max-w-sm"
            >
              <div className="flex items-center justify-between p-5 border-b border-[#1a1f3a]">
                <div className="flex items-center gap-2">
                  <Lock className="h-5 w-5 text-[#d4af37]" />
                  <h2 className="text-white font-semibold">Admin Access</h2>
                </div>
                <button
                  onClick={() => { setPasswordModalOpen(false); setPendingAction(null); setPendingDeleteCert(null); }}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="p-5 space-y-4">
                <p className="text-gray-400 text-sm">
                  Enter the admin password to continue.
                </p>

                <div className="relative">
                  <input
                    autoFocus
                    type={showPassword ? 'text' : 'password'}
                    value={passwordInput}
                    onChange={(e) => { setPasswordInput(e.target.value); setPasswordError(''); }}
                    onKeyDown={(e) => { if (e.key === 'Enter') handlePasswordSubmit(); }}
                    placeholder="Password"
                    className="w-full bg-[#0a0e27] border border-[#1a1f3a] rounded-md px-3 py-2.5 pr-10 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#d4af37]/60 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                  </button>
                </div>

                {passwordError && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-xs"
                  >
                    {passwordError}
                  </motion.p>
                )}

                <div className="flex gap-3 pt-1">
                  <button
                    onClick={() => { setPasswordModalOpen(false); setPendingAction(null); setPendingDeleteCert(null); }}
                    className="flex-1 py-2.5 rounded-md border border-[#1a1f3a] text-gray-300 text-sm font-medium hover:border-gray-500 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handlePasswordSubmit}
                    className="flex-1 py-2.5 rounded-md bg-[#d4af37] text-[#0a0e27] text-sm font-semibold hover:bg-[#e4c447] transition-colors flex items-center justify-center gap-2"
                  >
                    <Lock className="h-4 w-4" />
                    Unlock
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Upload Modal ── */}
      <AnimatePresence>
        {uploadOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={(e) => { if (e.target === e.currentTarget) setUploadOpen(false); }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-[#0f1629] border border-[#1a1f3a] rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between p-6 border-b border-[#1a1f3a]">
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-[#d4af37]" />
                  <h2 className="text-white font-semibold text-lg">Upload Certification</h2>
                </div>
                <button
                  onClick={() => setUploadOpen(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="p-6 space-y-5">
                {/* File drop zone */}
                <div
                  onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setDragOver(false);
                    const file = e.dataTransfer.files[0];
                    if (file) handleFileSelect(file);
                  }}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                    dragOver
                      ? 'border-[#d4af37] bg-[#d4af37]/5'
                      : form.file
                        ? 'border-[#d4af37]/60 bg-[#d4af37]/5'
                        : 'border-[#1a1f3a] hover:border-[#d4af37]/40'
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png,.webp"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileSelect(file);
                    }}
                  />
                  {form.file ? (
                    <div className="flex flex-col items-center gap-2">
                      {form.file.type === 'application/pdf'
                        ? <FileText className="h-8 w-8 text-[#d4af37]" />
                        : <ImageIcon className="h-8 w-8 text-[#d4af37]" />
                      }
                      <p className="text-white text-sm font-medium">{form.file.name}</p>
                      <p className="text-gray-400 text-xs">
                        {(form.file.size / 1024 / 1024).toFixed(2)} MB — click to change
                      </p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2">
                      <Upload className="h-8 w-8 text-gray-500" />
                      <p className="text-gray-300 text-sm">
                        Drag & drop or <span className="text-[#d4af37]">browse</span>
                      </p>
                      <p className="text-gray-500 text-xs">PDF, JPG, PNG, WEBP — max 10 MB</p>
                    </div>
                  )}
                </div>

                {/* Form fields */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-300 text-sm mb-1.5">
                      Certificate Name <span className="text-[#d4af37]">*</span>
                    </label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      placeholder="e.g. AWS Certified Solutions Architect"
                      className="w-full bg-[#0a0e27] border border-[#1a1f3a] rounded-md px-3 py-2.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#d4af37]/60 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 text-sm mb-1.5">
                      Issuing Organization <span className="text-[#d4af37]">*</span>
                    </label>
                    <input
                      type="text"
                      value={form.issuer}
                      onChange={(e) => setForm((f) => ({ ...f, issuer: e.target.value }))}
                      placeholder="e.g. Amazon Web Services"
                      className="w-full bg-[#0a0e27] border border-[#1a1f3a] rounded-md px-3 py-2.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#d4af37]/60 transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-300 text-sm mb-1.5">Issue Date</label>
                      <input
                        type="text"
                        value={form.issue_date}
                        onChange={(e) => setForm((f) => ({ ...f, issue_date: e.target.value }))}
                        placeholder="e.g. Mar 2024"
                        className="w-full bg-[#0a0e27] border border-[#1a1f3a] rounded-md px-3 py-2.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#d4af37]/60 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 text-sm mb-1.5">Credential ID</label>
                      <input
                        type="text"
                        value={form.credential_id}
                        onChange={(e) => setForm((f) => ({ ...f, credential_id: e.target.value }))}
                        placeholder="Optional"
                        className="w-full bg-[#0a0e27] border border-[#1a1f3a] rounded-md px-3 py-2.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#d4af37]/60 transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit */}
                <div className="flex gap-3 pt-1">
                  <button
                    onClick={() => { setUploadOpen(false); setForm(EMPTY_FORM); }}
                    className="flex-1 py-2.5 rounded-md border border-[#1a1f3a] text-gray-300 text-sm font-medium hover:border-gray-500 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUpload}
                    disabled={uploading}
                    className="flex-1 py-2.5 rounded-md bg-[#d4af37] text-[#0a0e27] text-sm font-semibold hover:bg-[#e4c447] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {uploading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Uploading…
                      </>
                    ) : (
                      <>
                        <Upload className="h-4 w-4" />
                        Upload
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── View Certificate Modal ── */}
      <AnimatePresence>
        {viewCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={(e) => { if (e.target === e.currentTarget) setViewCert(null); }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#0f1629] border border-[#1a1f3a] rounded-xl w-full max-w-4xl max-h-[90vh] flex flex-col"
            >
              <div className="flex items-center justify-between p-4 border-b border-[#1a1f3a] shrink-0">
                <div className="min-w-0">
                  <h2 className="text-white font-semibold truncate">{viewCert.name}</h2>
                  <p className="text-gray-400 text-sm">{viewCert.issuer}</p>
                </div>
                <button
                  onClick={() => setViewCert(null)}
                  className="ml-4 text-gray-400 hover:text-white transition-colors shrink-0"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="flex-1 overflow-hidden rounded-b-xl">
                {viewCert.file_type === 'pdf' ? (
                  <iframe
                    src={viewCert.file_url}
                    className="w-full h-full min-h-[60vh]"
                    title={viewCert.name}
                  />
                ) : (
                  <div className="flex items-center justify-center p-6 h-full min-h-[60vh]">
                    <img
                      src={viewCert.file_url}
                      alt={viewCert.name}
                      className="max-w-full max-h-full object-contain rounded-lg"
                    />
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
