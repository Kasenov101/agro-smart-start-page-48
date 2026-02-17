import { Button } from "@nextui-org/react";
import { SearchX, ArrowLeft, Mail } from "lucide-react";
import { motion } from "framer-motion";
import inviteBg from "@/assets/invite-bg.jpg";

const Invite = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Fullscreen background */}
      <img
        src={inviteBg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 max-w-md w-full mx-4"
      >
        <div className="rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl p-10 text-center">
          {/* Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-white/15 border border-white/20"
          >
            <SearchX className="h-9 w-9 text-white/80" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h1 className="text-2xl font-bold text-white mb-3">
              Приглашение не найдено
            </h1>
            <p className="text-white/70 text-sm leading-relaxed mb-8">
              Ссылка недействительна или срок действия приглашения истёк.
              Обратитесь к отправителю для получения нового приглашения.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="space-y-3"
          >
            <Button
              as="a"
              href="/"
              className="w-full bg-white text-gray-900 font-medium hover:bg-white/90"
              size="lg"
              startContent={<ArrowLeft className="h-4 w-4" />}
            >
              На главную
            </Button>

            <Button
              as="a"
              href="mailto:support@example.com"
              variant="bordered"
              className="w-full border-white/30 text-white hover:bg-white/10"
              size="lg"
              startContent={<Mail className="h-4 w-4" />}
            >
              Связаться с поддержкой
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Invite;
