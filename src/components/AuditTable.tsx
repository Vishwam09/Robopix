import React, { useState } from 'react';
import { Download, ArrowUpRight, Search, FileText } from 'lucide-react';
import { Project, DesignSystemTheme } from '../types/portfolio';

interface AuditTableProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
  currentTheme: DesignSystemTheme;
}

export const AuditTable: React.FC<AuditTableProps> = ({
  projects,
  onSelectProject,
  currentTheme,
}) => {
  const [filterQuery, setFilterQuery] = useState('');
  const isLime = currentTheme === 'lime';

  const filtered = projects.filter(
    (p) =>
      p.sysId.toLowerCase().includes(filterQuery.toLowerCase()) ||
      p.title.toLowerCase().includes(filterQuery.toLowerCase()) ||
      p.purpose.toLowerCase().includes(filterQuery.toLowerCase()) ||
      p.operationalNode.toLowerCase().includes(filterQuery.toLowerCase())
  );

  const handleExportCSV = () => {
    const headers = ['System_ID', 'Project_Title', 'Category', 'Status', 'Runtime_Node', 'Date_Created'];
    const rows = projects.map((p) => [
      p.sysId,
      `"${p.title.replace(/"/g, '""')}"`,
      `"${p.categoryLabel}"`,
      p.status,
      p.operationalNode,
      p.dateCreated,
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'ROBOPIX_Systems_Compliance_Audit_2026.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="audit-table" className="w-full py-12 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col gap-6">
        
        {/* Header Strip */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-current/15">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span
                className={`font-mono text-xs font-bold uppercase px-3 py-1 rounded-md border ${
                  isLime
                    ? 'bg-[#B9FF66] text-[#191A23] border-[#191A23]'
                    : 'bg-[#262626] text-white border-[#404040]'
                }`}
              >
                REGISTRY SPEC // 10 ENGINES
              </span>
              <span className="text-xs font-mono opacity-70">
                VERIFIED SPECIFICATION INVARIANTS
              </span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight">
              Hardware &amp; Systems Compliance Audit
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleExportCSV}
              className={`px-4 py-2 rounded-xl text-xs font-display font-bold uppercase transition-all flex items-center gap-1.5 border cursor-pointer ${
                isLime
                  ? 'bg-white text-[#191A23] border-[#191A23] shadow-brutal-sm hover:bg-[#B9FF66]'
                  : 'bg-[#141414] text-white border-[#333333] hover:border-white rounded-none'
              }`}
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* Search input for table */}
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 opacity-50" />
          <input
            type="text"
            placeholder="Filter audit records by SysID or node..."
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            className={`w-full pl-10 pr-4 py-2 text-xs font-mono rounded-xl border transition-all ${
              isLime
                ? 'bg-white border-[#191A23] text-[#191A23] focus:ring-2 focus:ring-[#B9FF66]'
                : 'bg-[#0E0E0E] border-[#262626] text-white focus:border-white'
            }`}
          />
        </div>

        {/* Tabular Viewport */}
        <div
          className={`w-full overflow-x-auto border-2 rounded-3xl p-1 ${
            isLime
              ? 'bg-white border-[#191A23] shadow-brutal'
              : 'bg-[#0A0A0A] border-[#262626] rounded-none'
          }`}
        >
          <table className="w-full text-left text-xs font-mono">
            <thead
              className={`font-display text-xs uppercase tracking-wider ${
                isLime ? 'bg-[#191A23] text-white' : 'bg-[#141414] text-[#A3A3A3]'
              }`}
            >
              <tr>
                <th className="p-4 rounded-l-2xl font-bold">SYSTEM ID</th>
                <th className="p-4 font-bold">SYSTEM CODE</th>
                <th className="p-4 font-bold">PRIMARY PROTOCOL</th>
                <th className="p-4 font-bold">TIER</th>
                <th className="p-4 font-bold">RUNTIME NODE</th>
                <th className="p-4 rounded-r-2xl font-bold text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-current/10">
              {filtered.map((item) => (
                <tr
                  key={item.id}
                  onClick={() => onSelectProject(item)}
                  className={`transition-colors cursor-pointer ${
                    isLime ? 'hover:bg-[#F3F3F3]' : 'hover:bg-[#141414]'
                  }`}
                >
                  <td className="p-4 font-bold text-sm tabular-nums whitespace-nowrap">
                    {item.sysId}
                  </td>
                  <td className="p-4">
                    <span className="font-display font-bold uppercase block text-sm">
                      {item.title}
                    </span>
                    <span className="text-[11px] opacity-70 block truncate max-w-xs">
                      {item.purpose}
                    </span>
                  </td>
                  <td className="p-4 opacity-80 whitespace-nowrap">
                    {item.categoryLabel}
                  </td>
                  <td className="p-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                        item.status === 'LIVE'
                          ? isLime
                            ? 'bg-[#B9FF66] text-[#191A23] border-[#191A23]'
                            : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                          : isLime
                          ? 'bg-[#F3F3F3] text-[#191A23] border-[#191A23]'
                          : 'bg-[#1A1A1A] text-[#A3A3A3] border-[#333333]'
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="p-4 text-[11px] opacity-70 whitespace-nowrap">
                    {item.operationalNode}
                  </td>
                  <td className="p-4 text-right whitespace-nowrap">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectProject(item);
                      }}
                      className={`p-1.5 rounded-lg border inline-flex items-center gap-1 text-[11px] font-bold uppercase transition-all ${
                        isLime
                          ? 'border-[#191A23] hover:bg-[#B9FF66]'
                          : 'border-[#333333] hover:border-white'
                      }`}
                    >
                      <span>Inspect</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </section>
  );
};
