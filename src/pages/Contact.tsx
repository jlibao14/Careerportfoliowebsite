import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../app/components/ui/card';
import { Button } from '../app/components/ui/button';
import { Input } from '../app/components/ui/input';
import { Textarea } from '../app/components/ui/textarea';
import { Label } from '../app/components/ui/label';
import { Mail, Linkedin, MapPin } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { sendEmail } from '../services/emailService';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await sendEmail(formData);
      toast.success('Message sent successfully! I\'ll get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Failed to send email:', error);
      toast.error('Failed to send message. Please try again or email me directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-[#0a0e27] pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Get in Touch
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Interested in discussing technology leadership, digital transformation,
            or potential collaboration opportunities? I'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1 space-y-6"
          >
            <Card className="bg-[#0f1629] border-[#1a1f3a]">
              <CardHeader>
                <CardTitle className="text-white">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-[#d4af37] mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Email</p>
                    <a
                      href="mailto:mymail@jlibao.cloud-ip.cc"
                      className="text-gray-300 hover:text-[#d4af37] transition-colors"
                    >
                      mymail@jlibao.cloud-ip.cc
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Linkedin className="h-5 w-5 text-[#d4af37] mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-400 mb-1">LinkedIn</p>
                    <a
                      href="https://linkedin.com/in/jlibao14"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-300 hover:text-[#d4af37] transition-colors"
                    >
                      linkedin.com/in/jlibao14
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-[#d4af37] mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Location</p>
                    <p className="text-gray-300">Quezon City, Philippines</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#0f1629] border-[#1a1f3a]">
              <CardHeader>
                <CardTitle className="text-white">Availability</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 text-sm">
                  I'm currently open to discussing consulting opportunities,
                  executive leadership roles, and strategic advisory positions.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2"
          >
            <Card className="bg-[#0f1629] border-[#1a1f3a]">
              <CardHeader>
                <CardTitle className="text-white">Send a Message</CardTitle>
                <CardDescription className="text-gray-400">
                  Fill out the form below and I'll get back to you within 24 hours.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-gray-300">
                        Name
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="bg-[#0a0e27] border-[#1a1f3a] text-white focus:border-[#d4af37]"
                        placeholder="Your name"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-gray-300">
                        Email
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="bg-[#0a0e27] border-[#1a1f3a] text-white focus:border-[#d4af37]"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-gray-300">
                      Subject
                    </Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="bg-[#0a0e27] border-[#1a1f3a] text-white focus:border-[#d4af37]"
                      placeholder="What would you like to discuss?"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-gray-300">
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="bg-[#0a0e27] border-[#1a1f3a] text-white focus:border-[#d4af37] resize-none"
                      placeholder="Tell me more about your inquiry..."
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#d4af37] hover:bg-[#b8941f] text-[#0a0e27]"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
