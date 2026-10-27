import React, { useState, useMemo } from 'react';
import { Search, ArrowUpRight, Cpu, LayoutGrid, Layers, ExternalLink, Sparkles, SlidersHorizontal } from 'lucide-react';
import { Project, ProjectCategory, DesignSystemTheme, VisualMode } from '../types/portfolio';

interface PortfolioGalleryProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
  currentTheme: DesignSystemTheme;
  visualMode: VisualMode;
  onVisualModeChange: (mode: VisualMode) => void;
}

export const PortfolioGallery: React.FC<PortfolioGalleryProps> = ({
  projects,
  onSelectProject,
  currentTheme,
  visualMode,
  onVisualModeChange,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'LIVE' | 'PROTOTYPE' | 'IN DEV'>('ALL');

  const isLime = currentTheme === 'lime';

  // Category counts
  const counts = useMemo(() => {
    const acc: Record<string, number> = { ALL: projects.length };
    projects.forEach((p) => {
      acc[p.category] = (acc[p.category] || 0) + 1;
    });
    return acc;
  }, [projects]);

  // Filtered list
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory = selectedCategory === 'ALL' || project.category === selectedCategory;
      const matchesStatus = statusFilter === 'ALL' || project.status === statusFilter;
      const matchesSearch =
        searchQuery.trim() === '' ||
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.purpose.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.techStack.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
        project.sysId.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesStatus && matchesSearch;
    });
  }, [projects, selectedCategory, statusFilter, searchQuery]);

  return (
    <section id="projects" className="w-full py-12 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col gap-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-current/15">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <span
                className={`font-display font-bold text-2xl sm:text-3xl uppercase tracking-tight px-3 py-1 rounded-md border ${
                  isLime
                    ? 'bg-[#B9FF66] text-[#191A23] border-[#191A23]'
                    : 'bg-[#FFFFFF] text-[#000000] border-[#FFFFFF]'
                }`}
              >
                Projects Archive
              </span>
              <span
                className={`text-xs font-mono font-bold uppercase px-2.5 py-1 rounded-full border ${
                  isLime
                    ? 'bg-[#F3F3F3] text-[#191A23] border-[#191A23]/20'
                    : 'bg-[#1A1A1A] text-[#A3A3A3] border-[#333333]'
                }`}
              >
                10 VERIFIED SYSTEMS
              </span>
            </div>
            <p className={`text-sm ${isLime ? 'text-[#555866]' : 'text-[#888888]'}`}>
              Comprehensive catalog of operational web runtimes, low-latency firmware, and autonomous AI architectures.
            </p>
          </div>

          {/* View mode toggle (Bento vs Grid) */}
          <div className="flex items-center gap-2 self-start md:self-auto">
            <span className={`text-xs font-mono uppercase mr-1 hidden sm:inline ${isLime ? 'text-[#555866]' : 'text-[#888888]'}`}>
              Layout:
            </span>
            <div
              className={`flex items-center gap-1 p-1 rounded-xl border ${
                isLime ? 'bg-[#F3F3F3] border-[#191A23]/15' : 'bg-[#111111] border-[#333333]'
              }`}
            >
              <button
                onClick={() => onVisualModeChange('bento')}
                className={`px-3 py-1 text-xs font-display font-bold uppercase transition-all rounded-lg flex items-center gap-1.5 cursor-pointer ${
                  visualMode === 'bento'
                    ? isLime
                      ? 'bg-white text-[#191A23] border border-[#191A23] shadow-sm'
                      : 'bg-[#FFFFFF] text-black font-bold'
                    : isLime
                    ? 'text-[#555866] hover:text-[#191A23]'
                    : 'text-[#888888] hover:text-white'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Bento</span>
              </button>
              <button
                onClick={() => onVisualModeChange('grid')}
                className={`px-3 py-1 text-xs font-display font-bold uppercase transition-all rounded-lg flex items-center gap-1.5 cursor-pointer ${
                  visualMode === 'grid'
                    ? isLime
                      ? 'bg-white text-[#191A23] border border-[#191A23] shadow-sm'
                      : 'bg-[#FFFFFF] text-black font-bold'
                    : isLime
                    ? 'text-[#555866] hover:text-[#191A23]'
                    : 'text-[#888888] hover:text-white'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Grid</span>
              </button>
            </div>
          </div>
        </div>

        {/* Filter Controls Row */}
        <div className="flex flex-col gap-4">
          
          {/* Category Tabs */}
          <div
            className={`flex flex-wrap gap-2 p-2 rounded-2xl border ${
              isLime ? 'bg-[#F3F3F3] border-[#191A23]' : 'bg-[#111111] border-[#262626]'
            }`}
          >
            {[
              { id: 'ALL', label: 'ALL' },
              { id: 'AI_AUTOMATION', label: 'AI & AUTOMATION' },
              { id: 'HARDWARE_ROBOTICS', label: 'ROBOTICS & HARDWARE' },
              { id: 'WEB_PLATFORMS', label: 'WEB SYSTEMS' },
              { id: 'MOBILE_APPS', label: 'MOBILE APPS' },
              { id: 'AI_ASSISTANTS', label: 'AI ASSISTANTS' },
              { id: 'PRODUCTIVITY_EXPERIMENTAL', label: 'PRODUCTIVITY & LABS' },
            ].map((cat) => {
              const count = counts[cat.id] || 0;
              const isActive = selectedCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id as ProjectCategory)}
                  className={`px-3.5 py-1.5 rounded-xl font-display text-xs font-bold uppercase transition-all cursor-pointer whitespace-nowrap ${
                    isActive
                      ? isLime
                        ? 'bg-[#191A23] text-[#B9FF66] shadow-brutal-sm'
                        : 'bg-[#FFFFFF] text-[#000000]'
                      : isLime
                      ? 'bg-white text-[#191A23] hover:bg-[#B9FF66] border border-[#191A23]/30'
                      : 'bg-[#1A1A1A] text-[#A3A3A3] hover:text-white hover:bg-[#262626] border border-[#333333]'
                  }`}
                >
                  {cat.label} [{count}]
                </button>
              );
            })}
          </div>

          {/* Search & Status Controls */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search
                className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 ${
                  isLime ? 'text-[#888888]' : 'text-[#666666]'
                }`}
              />
              <input
                type="text"
                placeholder="Search systems, protocols, or tech stack (e.g. ESP32, Python, WebSockets, Flutter)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-xs font-mono border transition-all ${
                  isLime
                    ? 'bg-white border-[#191A23] text-[#191A23] placeholder-[#888888] focus:outline-none focus:ring-2 focus:ring-[#B9FF66]'
                    : 'bg-[#0E0E0E] border-[#262626] text-[#E5E5E5] placeholder-[#555555] focus:outline-none focus:border-[#FFFFFF]'
                }`}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono font-bold text-[#888888] hover:text-black dark:hover:text-white"
                >
                  CLEAR
                </button>
              )}
            </div>

            {/* Quick Status Filter */}
            <div
              className={`flex items-center gap-1 p-1 rounded-xl border shrink-0 ${
                isLime ? 'bg-white border-[#191A23]' : 'bg-[#0E0E0E] border-[#262626]'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5 mx-2 text-[#888888]" />
              {(['ALL', 'LIVE', 'PROTOTYPE', 'IN DEV'] as const).map((st) => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-2.5 py-1 text-[11px] font-mono font-bold uppercase transition-all rounded-lg cursor-pointer ${
                    statusFilter === st
                      ? isLime
                        ? 'bg-[#B9FF66] text-[#191A23] border border-[#191A23]'
                        : 'bg-[#262626] text-white border border-[#404040]'
                      : 'text-[#888888] hover:text-black dark:hover:text-white'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Empty Search Result */}
        {filteredProjects.length === 0 && (
          <div
            className={`p-12 text-center rounded-2xl border-2 border-dashed ${
              isLime
                ? 'border-[#191A23]/30 bg-[#F3F3F3] text-[#191A23]'
                : 'border-[#333333] bg-[#0E0E0E] text-[#A3A3A3]'
            }`}
          >
            <Cpu className="w-10 h-10 mx-auto mb-3 opacity-50" />
            <h3 className="font-display text-lg font-bold uppercase">No matching systems found</h3>
            <p className="text-xs font-mono mt-1">
              Adjust your search keywords or reset category filters to view active archives.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('ALL');
                setSearchQuery('');
                setStatusFilter('ALL');
              }}
              className="mt-4 px-4 py-2 bg-[#191A23] text-[#B9FF66] text-xs font-display font-bold uppercase rounded-lg border border-[#191A23] hover:bg-black cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* BENTO VIEW MODE */}
        {visualMode === 'bento' && filteredProjects.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 items-stretch">
            {filteredProjects.map((project, idx) => {
              // Asymmetric Bento sizing: Featured items get larger col spans
              const isLarge = project.featured && (idx === 0 || idx === 1 || idx === 4);
              const colSpanClass = isLarge
                ? 'lg:col-span-8'
                : idx % 3 === 0
                ? 'lg:col-span-6'
                : 'lg:col-span-4';

              return (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onSelect={onSelectProject}
                  currentTheme={currentTheme}
                  colSpanClass={colSpanClass}
                  isLarge={isLarge}
                />
              );
            })}
          </div>
        )}

        {/* GRID VIEW MODE */}
        {visualMode === 'grid' && filteredProjects.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onSelect={onSelectProject}
                currentTheme={currentTheme}
                colSpanClass="col-span-1"
                isLarge={false}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

/* Individual Project Card Component */
interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
  currentTheme: DesignSystemTheme;
  colSpanClass: string;
  isLarge: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onSelect,
  currentTheme,
  colSpanClass,
  isLarge,
}) => {
  const isLime = currentTheme === 'lime';

  // Surface mode: light, lime, or dark container
  let containerStyle = '';
  let badgeStyle = '';
  let textTitleStyle = '';
  let textBodyStyle = '';
  let footerBorder = '';

  if (isLime) {
    if (project.themeVariant === 'lime') {
      containerStyle = 'bg-[#B9FF66] border-2 border-[#191A23] text-[#191A23] shadow-brutal';
      badgeStyle = 'bg-white text-[#191A23] border border-[#191A23]';
      textTitleStyle = 'text-[#191A23]';
      textBodyStyle = 'text-[#191A23]';
      footerBorder = 'border-[#191A23]/25';
    } else if (project.themeVariant === 'dark') {
      containerStyle = 'bg-[#191A23] border-2 border-[#191A23] text-white shadow-brutal';
      badgeStyle = 'bg-[#B9FF66] text-[#191A23] border border-[#191A23]';
      textTitleStyle = 'text-white';
      textBodyStyle = 'text-white/80';
      footerBorder = 'border-white/15';
    } else {
      containerStyle = 'bg-[#F3F3F3] border-2 border-[#191A23] text-[#191A23] shadow-brutal';
      badgeStyle = 'bg-[#B9FF66] text-[#191A23] border border-[#191A23]';
      textTitleStyle = 'text-[#191A23]';
      textBodyStyle = 'text-[#555866]';
      footerBorder = 'border-[#191A23]/15';
    }
  } else {
    // Flight spec dark mode
    containerStyle = 'bg-[#0E0E0E] border border-[#262626] text-[#E5E5E5] hover:border-[#FFFFFF] rounded-none';
    badgeStyle = 'bg-[#1A1A1A] text-[#FFFFFF] border border-[#404040] rounded-none';
    textTitleStyle = 'text-[#FFFFFF]';
    textBodyStyle = 'text-[#A3A3A3]';
    footerBorder = 'border-[#262626]';
  }

  return (
    <article
      onClick={() => onSelect(project)}
      className={`${colSpanClass} ${containerStyle} ${
        isLime ? 'rounded-3xl hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none' : ''
      } p-6 flex flex-col justify-between transition-all cursor-pointer group`}
    >
      <div className="flex flex-col gap-4">
        {/* Top Meta Header: Zero pill discipline */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className={`font-display text-xs font-bold uppercase px-3 py-1 rounded-md ${badgeStyle}`}>
              {project.categoryLabel}
            </span>
            {project.featured && (
              <span className="flex items-center gap-1 text-[11px] font-mono font-bold text-[#191A23] dark:text-[#B9FF66]">
                <Sparkles className="w-3 h-3" />
                <span className="hidden sm:inline">SPOTLIGHT</span>
              </span>
            )}
          </div>

          {/* Status Badge */}
          <span
            className={`font-mono text-xs font-bold px-2 py-0.5 rounded border ${
              project.status === 'LIVE'
                ? isLime
                  ? 'bg-white text-[#191A23] border-[#191A23]'
                  : 'bg-[#111111] text-[#B9FF66] border-[#333333]'
                : isLime
                ? 'bg-[#191A23] text-white border-[#191A23]'
                : 'bg-[#111111] text-[#E5E5E5] border-[#333333]'
            }`}
          >
            {project.status}
          </span>
        </div>

        {/* Title and Purpose */}
        <div>
          <div className="font-mono text-[11px] uppercase opacity-70 mb-1">
            SYS_ID // {project.sysId} · {project.dateCreated}
          </div>
          <h3 className={`font-display font-bold uppercase tracking-tight text-xl sm:text-2xl ${textTitleStyle}`}>
            {project.title}
          </h3>
          <p className="font-mono text-xs font-semibold mt-1 opacity-90">
            PURPOSE: {project.purpose}
          </p>
        </div>

        {/* Summary */}
        <p className={`text-xs leading-relaxed ${textBodyStyle} ${isLarge ? 'line-clamp-4' : 'line-clamp-3'}`}>
          {project.summary}
        </p>

        {/* Tech Stack Chips */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.techStack.slice(0, isLarge ? 5 : 4).map((tech) => (
            <span
              key={tech}
              className={`font-mono text-[11px] px-2 py-0.5 rounded-md border ${
                isLime
                  ? 'bg-white/80 text-[#191A23] border-[#191A23]/40'
                  : 'bg-[#1A1A1A] text-[#C4C7C7] border-[#333333]'
              }`}
            >
              {tech}
            </span>
          ))}
          {project.techStack.length > (isLarge ? 5 : 4) && (
            <span className="font-mono text-[11px] px-1.5 py-0.5 opacity-70 self-center">
              +{project.techStack.length - (isLarge ? 5 : 4)} more
            </span>
          )}
        </div>

        {/* Key Metrics for larger cards */}
        {isLarge && (
          <div className="grid grid-cols-3 gap-2 pt-3 border-t border-dashed border-current/20">
            {project.metrics.map((m) => (
              <div key={m.label} className="flex flex-col">
                <span className="text-[10px] font-mono uppercase opacity-70">{m.label}</span>
                <span className="font-display font-bold text-sm tabular-nums">{m.value}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Card Footer */}
      <div className={`flex items-center justify-between pt-5 mt-5 border-t ${footerBorder}`}>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-current opacity-60"></span>
          <span className="font-mono text-[11px] font-bold uppercase opacity-80">
            INSPECT BLUEPRINT
          </span>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onSelect(project);
          }}
          className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all cursor-pointer ${
            isLime
              ? project.themeVariant === 'lime'
                ? 'bg-[#191A23] text-white border-[#191A23] group-hover:bg-white group-hover:text-[#191A23]'
                : project.themeVariant === 'dark'
                ? 'bg-[#B9FF66] text-[#191A23] border-[#191A23] group-hover:bg-white'
                : 'bg-[#191A23] text-[#B9FF66] border-[#191A23] group-hover:bg-[#B9FF66] group-hover:text-[#191A23]'
              : 'bg-[#262626] text-white border-[#404040] group-hover:bg-white group-hover:text-black rounded-none'
          }`}
          title="Open System Blueprint & Simulator"
          aria-label={`View details for ${project.title}`}
        >
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>
    </article>
  );
};
