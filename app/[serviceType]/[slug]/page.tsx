"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import {
  MapPin,
  Phone,
  Clock,
  Star,
  Instagram,
  Facebook,
  Globe,
  CheckCircle,
  Calendar,
  ChevronRight,
} from "lucide-react";
import { useEstablishment } from "@/hooks/use-establishment";
import { useServices } from "@/hooks/use-services";
import { useProfessionals } from "@/hooks/use-establishment";
import { getProfessionalsByEstablishment } from "@/data/mock-db";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton, SkeletonCard } from "@/components/ui/skeleton";
import { formatPrice, formatPhone } from "@/lib/utils";
import { formatDuration } from "@/utils/service-helpers";
import { getWeekDayName } from "@/utils/date";
import { isValidServiceType } from "@/config/service-types";
import { BookingModal } from "@/components/ui/BookingModal";

export default function EstablishmentPage() {
  const params = useParams();
  const serviceType = params.serviceType as string;
  const slug = params.slug as string;

  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);

  const {
    establishment,
    isLoading: isLoadingEstablishment,
    error,
  } = useEstablishment(slug);
  const {
    services,
    categories,
    isLoading: isLoadingServices,
  } = useServices(establishment?.id || "");

  // Busca profissionais manualmente já que o hook não existe
  const professionals = establishment
    ? getProfessionalsByEstablishment(establishment.id)
    : [];

  if (!isValidServiceType(serviceType)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Tipo de serviço inválido
          </h1>
          <p className="text-gray-600">
            O tipo de serviço solicitado não existe.
          </p>
        </div>
      </div>
    );
  }

  if (isLoadingEstablishment) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="h-64 md:h-96 bg-gray-200">
          <Skeleton className="h-full w-full" />
        </div>
        <div className="container-custom -mt-20 relative z-10">
          <SkeletonCard className="bg-white" />
        </div>
      </div>
    );
  }

  if (error || !establishment) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Estabelecimento não encontrado
          </h1>
          <p className="text-gray-600">
            O estabelecimento solicitado não existe ou foi removido.
          </p>
        </div>
      </div>
    );
  }

  const primaryColor = establishment.primaryColor || "#3B82F6";

  // Agrupa serviços por categoria
  const servicesByCategory = categories.map((category) => ({
    category,
    services: services.filter((s) => s.category.id === category.id),
  }));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Image */}
      <div className="relative h-64 md:h-96">
        <Image
          src={establishment.images.hero || establishment.images.cover || ""}
          alt={establishment.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      </div>

      {/* Main Content */}
      <div className="container-custom -mt-20 relative z-10 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header Card */}
            <Card className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div>
                    <Badge
                      className="mb-3"
                      style={{
                        backgroundColor: `${primaryColor}20`,
                        color: primaryColor,
                      }}
                    >
                      {establishment.type.replace("-", " ")}
                    </Badge>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                      {establishment.name}
                    </h1>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                        <span className="font-medium">
                          {establishment.rating}
                        </span>
                        <span className="ml-1">
                          ({establishment.reviewCount} avaliações)
                        </span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
                        <span>{establishment.totalBookings} agendamentos</span>
                      </div>
                    </div>
                  </div>
                  <Button
                    onClick={() => setShowBookingModal(true)}
                    className="md:self-start"
                    style={{ backgroundColor: primaryColor }}
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Agendar
                  </Button>
                </div>

                <p className="mt-4 text-gray-600">
                  {establishment.description}
                </p>
              </CardContent>
            </Card>

            {/* Services */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Serviços oferecidos
                </h2>

                {isLoadingServices ? (
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <Skeleton key={i} className="h-20 w-full" />
                    ))}
                  </div>
                ) : (
                  <div className="space-y-8">
                    {servicesByCategory.map(
                      ({ category, services }) =>
                        services.length > 0 && (
                          <div key={category.id}>
                            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                              {category.name}
                              <span className="ml-2 text-sm text-gray-500">
                                ({services.length})
                              </span>
                            </h3>
                            <div className="space-y-3">
                              {services.map((service) => (
                                <div
                                  key={service.id}
                                  onClick={() => setSelectedService(service.id)}
                                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                                    selectedService === service.id
                                      ? "border-blue-500 bg-blue-50"
                                      : "border-gray-200 hover:border-gray-300"
                                  }`}
                                >
                                  <div className="flex justify-between items-start">
                                    <div>
                                      <h4 className="font-medium text-gray-900">
                                        {service.name}
                                      </h4>
                                      <p className="text-sm text-gray-600 mt-1">
                                        {service.description}
                                      </p>
                                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                                        <span className="flex items-center">
                                          <Clock className="w-4 h-4 mr-1" />
                                          {formatDuration(
                                            service.durationMinutes,
                                          )}
                                        </span>
                                      </div>
                                    </div>
                                    <div className="text-right">
                                      <div className="font-semibold text-gray-900">
                                        {formatPrice(service.price)}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ),
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Gallery */}
            {establishment.images.gallery.length > 0 && (
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">
                    Galeria
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {establishment.images.gallery.map((image, index) => (
                      <div
                        key={index}
                        className="relative aspect-square rounded-lg overflow-hidden"
                      >
                        <Image
                          src={image}
                          alt={`${establishment.name} - Foto ${index + 1}`}
                          fill
                          className="object-cover hover:scale-105 transition-transform"
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Contact Info */}
            <Card>
              <CardContent className="p-6 space-y-4">
                <h3 className="font-semibold text-gray-900">
                  Informações de contato
                </h3>

                <div className="space-y-3">
                  <div className="flex items-start">
                    <MapPin className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
                    <div className="text-sm">
                      <p className="text-gray-900">
                        {establishment.address.street},{" "}
                        {establishment.address.number}
                      </p>
                      {establishment.address.complement && (
                        <p className="text-gray-600">
                          {establishment.address.complement}
                        </p>
                      )}
                      <p className="text-gray-600">
                        {establishment.address.neighborhood}
                      </p>
                      <p className="text-gray-600">
                        {establishment.address.city} -{" "}
                        {establishment.address.state}
                      </p>
                      <p className="text-gray-600">
                        {establishment.address.zipCode}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <Phone className="w-5 h-5 text-gray-400 mr-3" />
                    <a
                      href={`tel:${establishment.phone}`}
                      className="text-sm text-gray-900 hover:text-blue-600"
                    >
                      {formatPhone(establishment.phone)}
                    </a>
                  </div>

                  {establishment.whatsapp && (
                    <div className="flex items-center">
                      <Phone className="w-5 h-5 text-green-500 mr-3" />
                      <a
                        href={`https://wa.me/${establishment.whatsapp.replace(/\D/g, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-gray-900 hover:text-green-600"
                      >
                        WhatsApp: {formatPhone(establishment.whatsapp)}
                      </a>
                    </div>
                  )}

                  {establishment.email && (
                    <div className="flex items-center">
                      <Globe className="w-5 h-5 text-gray-400 mr-3" />
                      <a
                        href={`mailto:${establishment.email}`}
                        className="text-sm text-gray-900 hover:text-blue-600"
                      >
                        {establishment.email}
                      </a>
                    </div>
                  )}
                </div>

                {/* Social Media */}
                {establishment.socialMedia && (
                  <div className="pt-4 border-t border-gray-100">
                    <p className="text-sm font-medium text-gray-900 mb-3">
                      Redes sociais
                    </p>
                    <div className="flex gap-3">
                      {establishment.socialMedia.instagram && (
                        <a
                          href={`https://instagram.com/${establishment.socialMedia.instagram.replace("@", "")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-pink-100 hover:text-pink-600 transition-colors"
                        >
                          <Instagram className="w-5 h-5" />
                        </a>
                      )}
                      {establishment.socialMedia.facebook && (
                        <a
                          href={`https://facebook.com/${establishment.socialMedia.facebook}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-blue-100 hover:text-blue-600 transition-colors"
                        >
                          <Facebook className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Business Hours */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4">
                  Horário de funcionamento
                </h3>
                <div className="space-y-2">
                  {establishment.bookingSettings.businessHours.map((hours) => (
                    <div
                      key={hours.dayOfWeek}
                      className="flex justify-between text-sm"
                    >
                      <span className="text-gray-600">
                        {getWeekDayName(
                          new Date(2024, 0, hours.dayOfWeek + 1),
                          true,
                        )}
                      </span>
                      <span
                        className={
                          hours.isOpen ? "text-gray-900" : "text-gray-400"
                        }
                      >
                        {hours.isOpen
                          ? `${hours.openTime} - ${hours.closeTime}`
                          : "Fechado"}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Professionals */}
            {professionals.length > 0 && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">
                    Profissionais
                  </h3>
                  <div className="space-y-4">
                    {professionals.map((professional) => (
                      <div
                        key={professional.id}
                        className="flex items-center gap-3"
                      >
                        <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
                          {professional.avatarUrl ? (
                            <Image
                              src={professional.avatarUrl}
                              alt={professional.name}
                              width={48}
                              height={48}
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-300 text-gray-600">
                              {professional.name.charAt(0)}
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {professional.name}
                          </p>
                          <div className="flex items-center text-sm text-gray-500">
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 mr-1" />
                            {professional.rating}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
            {/* O Modal que faltava */}
            <BookingModal 
              isOpen={showBookingModal}
              onClose={() => setShowBookingModal(false)}
              establishmentId={establishment.id}
              services={services}
              preSelectedServiceId={selectedService} // Passa o serviço que o usuário já clicou (se houver)
            />
          </div>
        </div>
      </div>
    </div>
  );
}
