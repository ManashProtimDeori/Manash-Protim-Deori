import React from 'react';
import {
  BarChart3, Bot, Boxes, Building2, CalendarDays, CircleDollarSign, CloudRain,
  Compass, Database, FlaskConical, Gauge, Layers3, MapPin, Megaphone,
  Mountain, MousePointerClick, Palette, Route, Scale, Search, ShieldCheck,
  ShoppingBag, SlidersHorizontal, Tags, Target, TrendingUp, Truck, Users,
  Warehouse
} from 'lucide-react';
import './SemanticIcon.css';

type Props = {
  label: string;
  iconOnly?: boolean;
  className?: string;
};

const pickIcon = (label: string) => {
  const v = label.toLowerCase();
  if (/rain/.test(v)) return CloudRain;
  if (/landslide|terrain|mountain/.test(v)) return Mountain;
  if (/route|road|distance|transport|edge/.test(v)) return Route;
  if (/warehouse/.test(v)) return Warehouse;
  if (/inventory|capacity|stock/.test(v)) return Boxes;
  if (/revenue|spend|cost|cac|ltv|budget|payback|npv|finance|financial|investment|benefit/.test(v)) return CircleDollarSign;
  if (/channel|marketing|promotion|media/.test(v)) return Megaphone;
  if (/audience|segment|reach|targeting|sample/.test(v)) return Users;
  if (/conversion|cvr|ctr|click/.test(v)) return MousePointerClick;
  if (/saturation|utilization|reliability|confidence|service/.test(v)) return Gauge;
  if (/risk|sensitivity|uncertainty|scenario/.test(v)) return SlidersHorizontal;
  if (/forecast|projection|trend|growth|incremental/.test(v)) return TrendingUp;
  if (/input|ingestion|source|data|path/.test(v)) return Database;
  if (/decision|action|optimization|recommended|allocation/.test(v)) return Target;
  if (/strategy|objective|position/.test(v)) return Compass;
  if (/research|method|evidence|claim|quality|finding/.test(v)) return FlaskConical;
  if (/company|platform/.test(v)) return Building2;
  if (/country|market|jurisdiction|district|geography/.test(v)) return MapPin;
  if (/creative/.test(v)) return Palette;
  if (/commerce/.test(v)) return ShoppingBag;
  if (/ai|automation/.test(v)) return Bot;
  if (/date|time|horizon/.test(v)) return CalendarDays;
  if (/equity|public value|compliance/.test(v)) return Scale;
  if (/status|type|category|tier/.test(v)) return Tags;
  if (/search|query/.test(v)) return Search;
  if (/transport(er)?/.test(v)) return Truck;
  if (/layer|framework|architecture/.test(v)) return Layers3;
  if (/impact|index|score|measurement|metric|performance|efficiency/.test(v)) return BarChart3;
  return ShieldCheck;
};

export const SemanticIcon: React.FC<Props> = ({ label, iconOnly = false, className = '' }) => {
  const Icon = pickIcon(label);
  if (iconOnly) {
    return <span className={`semantic-icon ${className}`} aria-hidden="true"><Icon /></span>;
  }
  return (
    <span className={`semantic-label ${className}`}>
      <span className="semantic-icon" aria-hidden="true"><Icon /></span>
      <span>{label}</span>
    </span>
  );
};
