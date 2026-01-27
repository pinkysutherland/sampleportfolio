
export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  demoUrl: string;
  githubUrl: string;
}

export interface NavItem {
  label: string;
  path: string;
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export interface Skill {
  name: string;
  icon: string;
  color: string;
}
