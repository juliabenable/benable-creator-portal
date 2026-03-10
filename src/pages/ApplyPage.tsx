import { useState, useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  User,
  MapPin,
  Sparkles,
  ArrowLeft,
  ArrowRight,
  Crown,
  Globe,
  Info,
  ChevronDown,
  Heart,
  Shirt,
  Sun,
  Dumbbell,
  UtensilsCrossed,
  Plane,
  Baby,
  Palette,
  Flower2,
  Sofa,
  BookOpen,
  PawPrint,
  Smartphone,
  Gift,
} from 'lucide-react';
import { useCreator } from '@/context/CreatorContext';
import { StickyCTA } from '@/components/StickyCTA';
import { toast } from 'sonner';

const TOTAL_STEPS = 6; // 0=Welcome, 1=Benefits, 2=PersonalInfo, 3=AboutMe, 4=Shipping, 5=SocialStats+Submit
const COUNTRIES = ['United States', 'Canada', 'United Kingdom', 'Australia', 'France', 'Germany', 'Brazil', 'Mexico', 'India', 'Japan'];

const CONTENT_NICHES = [
  { label: 'Beauty', icon: Heart },
  { label: 'Fashion', icon: Shirt },
  { label: 'Lifestyle', icon: Sun },
  { label: 'Fitness', icon: Dumbbell },
  { label: 'Food', icon: UtensilsCrossed },
  { label: 'Travel', icon: Plane },
  { label: 'Parenting', icon: Baby },
  { label: 'DIY / Crafts', icon: Palette },
  { label: 'Wellness', icon: Flower2 },
  { label: 'Home Decor', icon: Sofa },
];

const RECOMMEND_TOPICS = [
  { label: 'Books', icon: BookOpen },
  { label: 'Makeup', icon: Heart },
  { label: 'Fashion', icon: Shirt },
  { label: 'Fitness', icon: Dumbbell },
  { label: 'Cooking', icon: UtensilsCrossed },
  { label: 'Home Decor', icon: Sofa },
  { label: 'Travel', icon: Plane },
  { label: 'Pets', icon: PawPrint },
  { label: 'Tech', icon: Smartphone },
  { label: 'Skincare', icon: Flower2 },
  { label: 'Wellness', icon: Sun },
  { label: 'Parenting', icon: Baby },
];

const BRAND_LOGOS = [
  { name: 'Sephora', x: 2, y: 6, opacity: 0.9 },
  { name: 'Nike', x: 55, y: 3, opacity: 0.85 },
  { name: 'GAP', x: 8, y: 30, opacity: 0.7 },
  { name: 'Target', x: 52, y: 28, opacity: 0.8 },
  { name: 'Lululemon', x: 72, y: 18, opacity: 0.65 },
  { name: 'Etsy', x: 60, y: 52, opacity: 0.75 },
  { name: 'Skims', x: 35, y: 62, opacity: 0.7 },
  { name: 'Revolve', x: 5, y: 58, opacity: 0.6 },
  { name: 'Free People', x: 68, y: 68, opacity: 0.55 },
  { name: 'TripAdvisor', x: 30, y: 10, opacity: 0.65 },
];

export default function ApplyPage() {
  const { creatorStatus, submitApplication } = useCreator();
  const navigate = useNavigate();

  const [step, setStep] = useState(0);
  const [name, setName] = useState('Sarah Johnson');
  const [email, setEmail] = useState('sarah.johnson@email.com');
  const [selectedNiches, setSelectedNiches] = useState<string[]>([]);
  const [aboutMe, setAboutMe] = useState('');
  const [recommendTopics, setRecommendTopics] = useState<string[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);

  if (creatorStatus !== 'not_applied') {
    return <Navigate to="/" replace />;
  }

  function toggleItem(list: string[], item: string, setter: (v: string[]) => void) {
    setter(list.includes(item) ? list.filter((i) => i !== item) : [...list, item]);
  }

  function handleNext() {
    if (step === 2 && (!name.trim() || !email.trim())) {
      toast.error('Please fill in your name and email.');
      return;
    }
    setStep((s) => Math.min(s + 1, TOTAL_STEPS - 1));
  }

  function handleSubmit() {
    submitApplication(name);
    toast.success('Application submitted!');
    navigate('/');
  }

  const progressSteps = ['Benefits', 'About You', 'Your Style', 'Address', 'Social Stats'];
  const currentStepIndex = step - 1;

  return (
    <>
      {step === 0 ? (
        <div key={step} className="animate-in fade-in-0 duration-500">
          <WelcomeStep />
        </div>
      ) : (
        <div className="max-w-lg mx-auto px-4 py-6 pb-8">
          {/* Progress Indicator */}
          <div className="mb-6">
            <div className="flex items-center gap-1 mb-2">
              {progressSteps.map((_, i) => (
                <div key={i} className="flex-1 flex flex-col items-center">
                  <div
                    className={`h-1.5 w-full rounded-full transition-colors duration-300 ${
                      i < currentStepIndex
                        ? 'bg-primary'
                        : i === currentStepIndex
                        ? 'bg-primary'
                        : 'bg-muted'
                    }`}
                  />
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium text-primary">
                Step {step} of {TOTAL_STEPS - 1}
              </p>
              <p className="text-xs text-muted-foreground">
                {progressSteps[currentStepIndex]}
              </p>
            </div>
          </div>

          {/* Step content */}
          <div key={step} className="animate-in fade-in-0 slide-in-from-right-4 duration-300">
            {step === 1 && <BenefitsStep />}
            {step === 2 && (
              <PersonalInfoStep
                name={name}
                setName={setName}
                email={email}
                setEmail={setEmail}
                selectedNiches={selectedNiches}
                toggleNiche={(n) => toggleItem(selectedNiches, n, setSelectedNiches)}
              />
            )}
            {step === 3 && (
              <AboutMeStep
                aboutMe={aboutMe}
                setAboutMe={setAboutMe}
                recommendTopics={recommendTopics}
                toggleTopic={(t) => toggleItem(recommendTopics, t, setRecommendTopics)}
              />
            )}
            {step === 4 && <ShippingStep />}
            {step === 5 && <SocialStatsStep />}
          </div>
        </div>
      )}

      {/* Navigation */}
      <StickyCTA>
        <div className="flex gap-3">
          {step > 0 && (
            <Button variant="outline" className="flex-1 h-12" onClick={() => setStep((s) => s - 1)}>
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back
            </Button>
          )}
          {step < TOTAL_STEPS - 1 ? (
            <Button className="flex-1 h-12 text-base font-semibold" onClick={handleNext}>
              {step === 0 ? "Let's Get Started" : 'Next'}
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          ) : (
            <Button className="flex-1 h-12 text-base font-semibold" onClick={handleSubmit}>
              Submit Application
            </Button>
          )}
        </div>
        {step === TOTAL_STEPS - 1 && (
          <p className="text-center text-xs text-muted-foreground mt-2">
            We'll review your application and get back to you shortly.
          </p>
        )}
      </StickyCTA>
    </>
  );
}

/* ─── Step 0: Luxe Welcome with Floating Brand Logos ─── */
function WelcomeStep() {
  return (
    <div className="relative min-h-[calc(100vh-140px)] flex flex-col items-center justify-center overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#8B6BFA] via-[#C084FC] via-60% to-[#FF8A5C]" />

      {/* Subtle radial overlay for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.15)_0%,transparent_60%)]" />

      {/* Floating brand logo cards */}
      <div className="absolute inset-0 pointer-events-none">
        {BRAND_LOGOS.map((brand, i) => (
          <div
            key={brand.name}
            className={`absolute luxe-float-${(i % 4) + 1}`}
            style={{
              left: `${brand.x}%`,
              top: `${brand.y}%`,
              opacity: brand.opacity,
              animationDelay: `${i * 0.6}s`,
            }}
          >
            <div className="backdrop-blur-md bg-white/20 border border-white/30 rounded-2xl px-4 py-2.5 shadow-lg">
              <span className="text-white font-semibold text-xs tracking-wide whitespace-nowrap">{brand.name}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Center content */}
      <div className="relative z-10 text-center px-6 space-y-5">
        <Badge variant="secondary" className="bg-white/20 text-white border-white/30 backdrop-blur-sm text-xs gap-1.5 px-3 py-1">
          <Crown className="w-3 h-3" />
          By Invitation Only
        </Badge>

        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-white tracking-tight leading-tight">
            You've Been<br />Invited
          </h1>
          <p className="text-white/75 text-sm max-w-[260px] mx-auto leading-relaxed">
            Join a select group of creators with early access to brand campaigns
          </p>
        </div>

        <div className="pt-2">
          <p className="text-white font-bold text-2xl tracking-tight">30K+</p>
          <p className="text-white/80 text-xs font-medium uppercase tracking-widest">Brand Partners Unlocked</p>
        </div>
      </div>
    </div>
  );
}

/* ─── Step 1: Benefits — What is Benable Creator Program ─── */
function BenefitsStep() {
  return (
    <div className="space-y-4 py-2">
      <div className="text-center mb-5">
        <div className="welcome-icon icon-container inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-primary/10 mb-3">
          <Sparkles className="w-6 h-6 text-primary" />
        </div>
        <h2 className="text-xl font-bold tracking-tight">The Benable Creator Program</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Here's what you get as a Benable creator
        </p>
      </div>
      <div className="space-y-3">
        {[
          {
            icon: Crown,
            title: 'Priority Access',
            text: 'Get first access to paid brand campaigns before anyone else',
          },
          {
            icon: Globe,
            title: 'Top Brands',
            text: 'Work with beauty, lifestyle, wellness and fashion brands you love',
          },
          {
            icon: Gift,
            title: 'Free Products + Compensation',
            text: 'Receive free products or gift cards plus payment for every campaign',
          },
        ].map((item, i) => (
          <Card key={i}>
            <CardContent className="flex items-start gap-3 py-4 px-4">
              <div className="icon-container w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <item.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">{item.title}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">{item.text}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

/* ─── Step 2: Personal Info ─── */
function PersonalInfoStep({
  name, setName, email, setEmail,
  selectedNiches, toggleNiche,
}: {
  name: string; setName: (v: string) => void;
  email: string; setEmail: (v: string) => void;
  selectedNiches: string[]; toggleNiche: (n: string) => void;
}) {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <User className="w-4 h-4 text-primary" />
            About You
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="name">Full Name *</Label>
            <Input id="name" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="email">Email *</Label>
            <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="portfolio">Portfolio / Website</Label>
            <Input id="portfolio" placeholder="https://yoursite.com" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Content Niches</CardTitle>
          <p className="text-xs text-muted-foreground">Select all that apply</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-2">
            {CONTENT_NICHES.map((niche) => {
              const NicheIcon = niche.icon;
              return (
                <label
                  key={niche.label}
                  className={`flex items-center gap-2.5 text-sm cursor-pointer rounded-lg border px-3 py-2.5 transition-colors ${
                    selectedNiches.includes(niche.label)
                      ? 'border-primary bg-primary/5 font-medium'
                      : 'border-border hover:border-primary/30'
                  }`}
                >
                  <Checkbox
                    checked={selectedNiches.includes(niche.label)}
                    onCheckedChange={() => toggleNiche(niche.label)}
                    className="sr-only"
                  />
                  <div className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 ${
                    selectedNiches.includes(niche.label) ? 'bg-primary/15' : 'bg-muted'
                  }`}>
                    <NicheIcon className={`w-3.5 h-3.5 ${
                      selectedNiches.includes(niche.label) ? 'text-primary' : 'text-muted-foreground'
                    }`} />
                  </div>
                  <span>{niche.label}</span>
                </label>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

/* ─── Step 3: About Me + I Love Recommending ─── */
function AboutMeStep({
  aboutMe,
  setAboutMe,
  recommendTopics,
  toggleTopic,
}: {
  aboutMe: string;
  setAboutMe: (v: string) => void;
  recommendTopics: string[];
  toggleTopic: (t: string) => void;
}) {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <User className="w-4 h-4 text-primary" />
            About Me
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Stylist living and working in New York City with a casual flair, creating standout looks and sharing coveted fashion tips that set trends and inspire."
            value={aboutMe}
            onChange={(e) => setAboutMe(e.target.value)}
            className="min-h-24 text-sm"
          />
          <p className="text-[10px] text-muted-foreground mt-1.5">
            Tell brands a bit about who you are and what you create
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">I love recommending</CardTitle>
          <p className="text-xs text-muted-foreground">Select all that apply</p>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {RECOMMEND_TOPICS.map((topic) => {
              const TopicIcon = topic.icon;
              const isSelected = recommendTopics.includes(topic.label);
              return (
                <button
                  key={topic.label}
                  type="button"
                  onClick={() => toggleTopic(topic.label)}
                  className={`flex items-center gap-1.5 text-sm rounded-full border px-3.5 py-2 transition-all ${
                    isSelected
                      ? 'border-primary bg-primary/10 text-primary font-medium shadow-sm'
                      : 'border-border hover:border-primary/30 hover:bg-muted/50'
                  }`}
                >
                  <TopicIcon className={`w-3.5 h-3.5 ${isSelected ? 'text-primary' : 'text-muted-foreground'}`} />
                  {topic.label}
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

/* ─── Step 4: Shipping ─── */
function ShippingStep() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          <MapPin className="w-4 h-4 text-primary" />
          Shipping Address
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-start gap-2.5 p-3 bg-primary/5 rounded-lg">
          <Info className="w-4 h-4 text-primary shrink-0 mt-0.5" />
          <p className="text-xs text-muted-foreground">
            We collect your shipping address so that brands can send you products to review as part
            of their campaigns. Your address is kept private and only shared with brands you've
            accepted a campaign with.
          </p>
        </div>
        <div className="space-y-1.5">
          <Label>Street Address</Label>
          <Input placeholder="123 Main St" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label>City</Label>
            <Input placeholder="City" />
          </div>
          <div className="space-y-1.5">
            <Label>State / Province</Label>
            <Input placeholder="State" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label>ZIP / Postal Code</Label>
            <Input placeholder="ZIP" />
          </div>
          <div className="space-y-1.5">
            <Label>Country</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                {COUNTRIES.map((c) => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

/* ─── Step 5: Social Stats ─── */
function SocialStatsStep() {
  const [tiktokOpen, setTiktokOpen] = useState(false);
  const [igOpen, setIgOpen] = useState(false);

  return (
    <div className="space-y-4">
      {/* TikTok Stats Drawer */}
      <Collapsible open={tiktokOpen} onOpenChange={setTiktokOpen}>
        <Card>
          <CollapsibleTrigger asChild>
            <button className="w-full flex items-center justify-between px-5 py-4 text-sm font-medium hover:bg-muted/50 transition-colors rounded-xl">
              <span className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-black flex items-center justify-center text-white text-[10px] font-bold shrink-0">TK</span>
                TikTok Stats
              </span>
              <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${tiktokOpen ? 'rotate-180' : ''}`} />
            </button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="space-y-4 pt-0">
              <div className="space-y-1.5">
                <Label>TikTok Handle</Label>
                <Input placeholder="@yourtiktokhandle" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label>Followers</Label>
                  <Input type="number" placeholder="e.g. 15000" />
                </div>
                <div className="space-y-1.5">
                  <Label>Avg. Views</Label>
                  <Input type="number" placeholder="e.g. 5000" />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label className="flex items-center gap-1">
                  Engagement Rate
                  <span className="text-[10px] font-normal text-primary bg-primary/10 px-1.5 py-0.5 rounded-full cursor-help" title="Self-reported estimate from your account analytics">Estimate</span>
                </Label>
                <Input type="number" placeholder="e.g. 4.5" />
                <p className="text-[10px] text-muted-foreground">Self-reported estimate from your account analytics</p>
              </div>
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      {/* Instagram Stats Drawer */}
      <Collapsible open={igOpen} onOpenChange={setIgOpen}>
        <Card>
          <CollapsibleTrigger asChild>
            <button className="w-full flex items-center justify-between px-5 py-4 text-sm font-medium hover:bg-muted/50 transition-colors rounded-xl">
              <span className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center text-white text-[10px] font-bold shrink-0">IG</span>
                Instagram Stats
              </span>
              <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${igOpen ? 'rotate-180' : ''}`} />
            </button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="space-y-4 pt-0">
              <div className="space-y-1.5">
                <Label>Instagram Handle</Label>
                <Input placeholder="@yourinstagramhandle" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label>Followers</Label>
                  <Input type="number" placeholder="e.g. 15000" />
                </div>
                <div className="space-y-1.5">
                  <Label>Views (30 days)</Label>
                  <Input type="number" placeholder="e.g. 10000" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label>Reach (30 days)</Label>
                  <Input type="number" placeholder="e.g. 8000" />
                </div>
                <div className="space-y-1.5">
                  <Label className="flex items-center gap-1">
                    Engagement Rate
                    <span className="text-[10px] font-normal text-primary bg-primary/10 px-1.5 py-0.5 rounded-full cursor-help" title="Self-reported estimate from your account insights">Estimate</span>
                  </Label>
                  <Input type="number" placeholder="e.g. 3.2" />
                </div>
              </div>
              <p className="text-[10px] text-muted-foreground">Engagement rate is a self-reported estimate from your account insights</p>
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>
    </div>
  );
}
