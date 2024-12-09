// app/admin/settings/page.tsx
'use client'
import { AdminLayout } from '../AdminLayout';
import { useState } from 'react';

export default function AdminSettings() {
  const [settings, setSettings] = useState({
    siteName: 'Mi Tienda de Cactus',
    emailNotifications: true,
    darkMode: false,
  });

  const handleSettingChange = (key: string, value: any) => {
    setSettings({ ...settings, [key]: value });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Configuración
          </h2>
        </div>
        <div className="bg-white shadow rounded-lg p-6">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nombre del Sitio
              </label>
              <input
                type="text"
                value={settings.siteName}
                onChange={(e) => handleSettingChange('siteName', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={settings.emailNotifications}
                onChange={(e) => handleSettingChange('emailNotifications', e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
              />
              <label className="ml-2 block text-sm text-gray-900">
                Activar notificaciones por email
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={settings.darkMode}
                onChange={(e) => handleSettingChange('darkMode', e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
              />
              <label className="ml-2 block text-sm text-gray-900">
                Modo oscuro
              </label>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}